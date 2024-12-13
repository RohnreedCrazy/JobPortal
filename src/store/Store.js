import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import ChatsReducer from './apps/chat/ChatSlice';
import NotesReducer from './apps/notes/NotesSlice';
import EmailReducer from './apps/email/EmailSlice';
import TicketReducer from './apps/tickets/TicketSlice';
import ContactsReducer from './apps/contacts/ContactSlice';
import FindJobsReducer from './apps/FindJobs/FindJobsSlice';
import UserProfileReducer from './apps/userProfile/UserProfileSlice';
import companyReducer from './apps/company/companySlice';
import JobApplicationsReducer from './apps/jobApplications/JobApplicationsSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    chatReducer: ChatsReducer,
    emailReducer: EmailReducer,
    notesReducer: NotesReducer,
    contactsReducer: ContactsReducer,
    ticketReducer: TicketReducer,
    FindJobsReducer: FindJobsReducer,
    userpostsReducer: UserProfileReducer,
    companyReducer: companyReducer,
    JobApplicationsReducer: JobApplicationsReducer
  },
});