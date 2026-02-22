import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { DatabaseService } from "../services/DatabaseService";

@injectable()
export class AnalyticsRepo {
    constructor(@inject(TYPES.DatabaseService) private db: DatabaseService) { }

    async track(data: {
        pageUrl: string;
        ipAddress: string;
        userAgent: string;
        referrer?: string;
    }) {
        await this.db.query(
            "INSERT INTO analytics (page_url, ip_address, user_agent, referrer, country, city) VALUES (?, ?, ?, ?, ?, ?)",
            [data.pageUrl, data.ipAddress, data.userAgent, data.referrer || null, null, null]
        );
    }

    async updateGeolocation(id: number, country: string, city: string) {
        await this.db.query(
            "UPDATE analytics SET country = ?, city = ? WHERE id = ?",
            [country, city, id]
        );
    }

    async getPageViews(startDate?: string, endDate?: string) {
        let sql = `
            SELECT 
                page_url,
                COUNT(*) as views,
                COUNT(DISTINCT ip_address) as unique_visitors
            FROM analytics
        `;
        const params: any[] = [];

        if (startDate && endDate) {
            sql += " WHERE created_at BETWEEN ? AND ?";
            params.push(startDate, endDate);
        }

        sql += " GROUP BY page_url ORDER BY views DESC";

        return await this.db.query(sql, params);
    }

    async getGeographicData() {
        const countries = await this.db.query(`
            SELECT 
                country,
                COUNT(*) as visits,
                COUNT(DISTINCT ip_address) as unique_visitors
            FROM analytics
            WHERE country IS NOT NULL
            GROUP BY country
            ORDER BY visits DESC
            LIMIT 20
        `);

        const cities = await this.db.query(`
            SELECT 
                city,
                country,
                COUNT(*) as visits,
                COUNT(DISTINCT ip_address) as unique_visitors
            FROM analytics
            WHERE city IS NOT NULL
            GROUP BY city, country
            ORDER BY visits DESC
            LIMIT 20
        `);

        return { countries, cities };
    }

    async getStats() {
        const [totalViews] = await this.db.query("SELECT COUNT(*) as count FROM analytics");
        const [uniqueVisitors] = await this.db.query("SELECT COUNT(DISTINCT ip_address) as count FROM analytics");

        const [todayViews] = await this.db.query(
            "SELECT COUNT(*) as count FROM analytics WHERE DATE(created_at) = CURDATE()"
        );

        const [thisWeekViews] = await this.db.query(
            "SELECT COUNT(*) as count FROM analytics WHERE YEARWEEK(created_at) = YEARWEEK(NOW())"
        );

        const [thisMonthViews] = await this.db.query(
            "SELECT COUNT(*) as count FROM analytics WHERE YEAR(created_at) = YEAR(NOW()) AND MONTH(created_at) = MONTH(NOW())"
        );

        return {
            totalViews: totalViews[0]?.count || 0,
            uniqueVisitors: uniqueVisitors[0]?.count || 0,
            todayViews: todayViews[0]?.count || 0,
            thisWeekViews: thisWeekViews[0]?.count || 0,
            thisMonthViews: thisMonthViews[0]?.count || 0
        };
    }

    async getViewsOverTime(days = 30) {
        return await this.db.query(`
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as views,
                COUNT(DISTINCT ip_address) as unique_visitors
            FROM analytics
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        `, [days]);
    }

    async getBrowserStats() {
        return await this.db.query(`
            SELECT 
                CASE
                    WHEN user_agent LIKE '%Chrome%' THEN 'Chrome'
                    WHEN user_agent LIKE '%Firefox%' THEN 'Firefox'
                    WHEN user_agent LIKE '%Safari%' AND user_agent NOT LIKE '%Chrome%' THEN 'Safari'
                    WHEN user_agent LIKE '%Edge%' THEN 'Edge'
                    ELSE 'Other'
                END as browser,
                COUNT(*) as count
            FROM analytics
            WHERE user_agent IS NOT NULL
            GROUP BY browser
            ORDER BY count DESC
        `);
    }

    async getDeviceStats() {
        return await this.db.query(`
            SELECT 
                CASE
                    WHEN user_agent LIKE '%Mobile%' OR user_agent LIKE '%Android%' OR user_agent LIKE '%iPhone%' THEN 'Mobile'
                    WHEN user_agent LIKE '%Tablet%' OR user_agent LIKE '%iPad%' THEN 'Tablet'
                    ELSE 'Desktop'
                END as device,
                COUNT(*) as count
            FROM analytics
            WHERE user_agent IS NOT NULL
            GROUP BY device
            ORDER BY count DESC
        `);
    }

    async initTable() {
        await this.db.query(`
            CREATE TABLE IF NOT EXISTS analytics (
                id INT PRIMARY KEY AUTO_INCREMENT,
                page_url VARCHAR(500),
                ip_address VARCHAR(45),
                country VARCHAR(100),
                city VARCHAR(100),
                user_agent TEXT,
                referrer VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_created_at (created_at),
                INDEX idx_page_url (page_url),
                INDEX idx_country (country)
            )
        `);
    }
}
