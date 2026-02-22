import { Container } from "inversify";
import { TYPES } from "./types";
import { DatabaseService } from "./services/DatabaseService";
import { AuthService } from "./services/AuthService";
import { UserRepo } from "./repositories/UserRepo";
import { ContactRepo } from "./repositories/ContactRepo";
import { QuotationRepo } from "./repositories/QuotationRepo";
import { BlogRepo } from "./repositories/BlogRepo";
import { SpecificationsRepo } from "./repositories/SpecificationsRepo";
import { AnalyticsRepo } from "./repositories/AnalyticsRepo";
import { AdsRepo } from "./repositories/AdsRepo";
import { MailingContactRepo } from "./repositories/MailingContactRepo";
import { AuthController } from "./controllers/AuthController";
import { CompanyController } from "./controllers/CompanyController";
import { BlogController } from "./controllers/BlogController";
import { AdsController } from "./controllers/AdsController";
import { MailingController } from "./controllers/MailingController";

const container = new Container();

container.bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
container.bind<AuthService>(TYPES.AuthService).to(AuthService).inSingletonScope();
container.bind<UserRepo>(TYPES.UserRepo).to(UserRepo).inSingletonScope();
container.bind<ContactRepo>(TYPES.ContactRepo).to(ContactRepo).inSingletonScope();
container.bind<QuotationRepo>(TYPES.QuotationRepo).to(QuotationRepo).inSingletonScope();
container.bind<BlogRepo>(TYPES.BlogRepo).to(BlogRepo).inSingletonScope();
container.bind<SpecificationsRepo>(TYPES.SpecificationsRepo).to(SpecificationsRepo).inSingletonScope();
container.bind<AnalyticsRepo>(TYPES.AnalyticsRepo).to(AnalyticsRepo).inSingletonScope();
container.bind<AdsRepo>(TYPES.AdsRepo).to(AdsRepo).inSingletonScope();
container.bind<MailingContactRepo>(TYPES.MailingContactRepo).to(MailingContactRepo).inSingletonScope();

container.bind<AuthController>(AuthController).toSelf();
container.bind<CompanyController>(CompanyController).toSelf();
container.bind<BlogController>(BlogController).toSelf();
container.bind<AdsController>(AdsController).toSelf();
container.bind<MailingController>(MailingController).toSelf();

// Controllers are registered via decorators

export { container };
