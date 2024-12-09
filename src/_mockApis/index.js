import mock from './mock';
import './notes/NotesData';
import './chat/Chatdata';
import './email/EmailData';
import './ticket/TicketData';
import './contacts/ContactsData';
import './FindJobs/jobsData';
import './userprofile/PostData';
import './userprofile/UsersData';
import './company/companyData';
import './language/LanguageData';
import './auth/Account';

mock.onAny().passThrough();
