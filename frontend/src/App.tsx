import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// ==================== AUTH PAGES ====================
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import VerifyEmailNoticePage from './pages/VerifyEmailNoticePage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';

// ==================== USER PAGES ====================
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ProfilePage from './pages/ProfilePage';
import AccountSettingsPage from './pages/AccountSettingsPage';
import DeleteAccountPage from './pages/account/DeleteAccountPage';

// ==================== EXPERT PAGES ====================
import ExpertsPage from './pages/experts/ExpertsListPage';
import ExpertDetailPage from './pages/ExpertDetailPage';
import ExpertSearchPage from './pages/experts/ExpertSearchPage';
import ExpertSchedulePage from './pages/experts/ExpertSchedulePage';

// ==================== BOOKING PAGES ====================
import BookingsPage from './pages/bookings/BookingsPage';
import BookingDetailPage from './pages/bookings/BookingDetailPage';
import BookingPage from './pages/bookings/BookingPage';
import ReschedulePage from './pages/bookings/ReschedulePage';
import CancelBookingPage from './pages/bookings/CancelBookingPage';
import BookingConfirmationPage from './pages/bookings/BookingConfirmationPage';

// ==================== CONSULTATION PAGES ====================
import ConsultationRoomPage from './pages/consultation/ConsultationRoomPage';
import ConsultationHistoryPage from './pages/consultation/ConsultationHistoryPage';
import SessionNotesPage from './pages/consultation/SessionNotesPage';
import SessionFeedbackPage from './pages/consultation/SessionFeedbackPage';
import ReportIssuePage from './pages/consultation/ReportIssuePage';
import UploadDocumentPage from './pages/consultation/UploadDocumentPage';

// ==================== MESSAGING PAGES ====================
import InboxPage from './pages/messaging/InboxPage';
import ChatDetailPage from './pages/messaging/ChatDetailPage';
import NewMessagePage from './pages/messaging/NewMessagePage';
import BlockedUsersPage from './pages/messaging/BlockedUsersPage';
import GroupChatPage from './pages/messaging/GroupChatPage';

// ==================== TEST PAGES ====================
import TestsListPage from './pages/tests/TestsListPage';
import TestDetailPage from './pages/tests/TestDetailPage';
import TakeTestPage from './pages/tests/TakeTestPage';
import TestResultPage from './pages/tests/TestResultPage';
import TestHistoryPage from './pages/tests/TestHistoryPage';
import CreateTestPage from './pages/admin/tests/CreateTestPage';
import EditTestPage from './pages/admin/tests/EditTestPage';

// ==================== BLOG PAGES ====================
import BlogPage from './pages/blog/BlogPage';
import BlogDetailPage from './pages/blog/BlogDetailPage';
import BlogCategoryPage from './pages/blog/BlogCategoryPage';
import SavedArticlesPage from './pages/blog/SavedArticlesPage';
import CreateArticlePage from './pages/blog/CreateArticlePage';
import EditArticlePage from './pages/blog/EditArticlePage';
import ManageArticlesPage from './pages/blog/ManageArticlesPage';

// ==================== PAYMENT PAGES ====================
import CheckoutPage from './pages/payments/CheckoutPage';
import PaymentMethodsPage from './pages/payments/PaymentMethodsPage';
import WalletPage from './pages/payments/WalletPage';
import TransactionHistoryPage from './pages/payments/TransactionHistoryPage';
import InvoicePage from './pages/payments/InvoicePage';
import WithdrawPage from './pages/payments/WithdrawPage';
import RevenuePage from './pages/payments/RevenuePage';
import RefundRequestPage from './pages/payments/RefundRequestPage';
import CouponPage from './pages/payments/CouponPage';
import PromotionPage from './pages/payments/PromotionPage';
import GiftCardPage from './pages/payments/GiftCardPage';
import SubscriptionPage from './pages/payments/SubscriptionPage';
import PayoutSettingsPage from './pages/payments/PayoutSettingsPage';
import TaxInfoPage from './pages/payments/TaxInfoPage';
import PaymentAnalyticsPage from './pages/payments/PaymentAnalyticsPage';
import BillingAddressPage from './pages/payments/BillingAddressPage';

// ==================== NOTIFICATION PAGES ====================
import NotificationsPage from './pages/notifications/NotificationsPage';
import NotificationSettingsPage from './pages/notifications/NotificationSettingsPage';

// ==================== COMMUNITY PAGES ====================
import CommunityHubPage from './pages/community/CommunityHubPage';
import SupportGroupsPage from './pages/community/SupportGroupsPage';
import GroupDetailPage from './pages/community/GroupDetailPage';
import CreateGroupPage from './pages/community/CreateGroupPage';
import EditGroupPage from './pages/community/EditGroupPage';
import GroupSettingsPage from './pages/community/GroupSettingsPage';
import MyGroupsPage from './pages/community/MyGroupsPage';
import AnonymousSharingPage from './pages/community/AnonymousSharingPage';
import EventsPage from './pages/community/EventsPage';
import EventDetailPage from './pages/community/EventDetailPage';
import WorkshopsPage from './pages/community/WorkshopsPage';

// ==================== ADMIN PAGES ====================
import AdminDashboardPage from './pages/admin/DashboardPage';
import AdminUserManagementPage from './pages/admin/UserManagementPage';
import AdminUserDetailPage from './pages/admin/UserDetailPage';
import AdminExpertsManagementPage from './pages/admin/ExpertsManagementPage';
import AdminExpertDetailPage from './pages/admin/AdminExpertDetailPage';
import AdminExpertApprovalQueuePage from './pages/admin/ExpertApprovalQueuePage';
import AdminBookingsManagementPage from './pages/admin/BookingsManagementPage';
import AdminBookingDetailPage from './pages/admin/AdminBookingDetailPage';
import AdminPaymentsManagementPage from './pages/admin/PaymentsManagementPage';
import AdminPayoutsPage from './pages/admin/AdminPayoutsPage';
import AdminReportsPage from './pages/admin/ReportsPage';
import AdminContentManagementPage from './pages/admin/ContentManagementPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminTagsPage from './pages/admin/AdminTagsPage';
import AdminMediaPage from './pages/admin/AdminMediaPage';
import AdminAssessmentsPage from './pages/admin/AssessmentsManagementPage';
import AdminTestDetailPage from './pages/admin/AdminTestDetailPage';
import AdminCreateTestPage from './pages/admin/CreateTestPage';
import AdminEditTestPage from './pages/admin/EditTestPage';
import AdminRolesPermissionsPage from './pages/admin/RolesPermissionsPage';
import AdminSystemSettingsPage from './pages/admin/SystemSettingsPage';
import AdminNotificationsPage from './pages/admin/AdminNotificationsPage';
import AdminEmailTemplatesPage from './pages/admin/AdminEmailTemplatesPage';
import AdminCouponsPage from './pages/admin/AdminCouponsPage';
import AdminPromotionsPage from './pages/admin/AdminPromotionsPage';
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage';
import AdminBackupPage from './pages/admin/AdminBackupPage';
import AdminAPIPage from './pages/admin/AdminAPIPage';
import AdminSystemHealthPage from './pages/admin/AdminSystemHealthPage';
import AdminMaintenancePage from './pages/admin/AdminMaintenancePage';

// ==================== MODERATION PAGES ====================
import ModerationQueuePage from './pages/moderation/ModerationQueuePage';
import ReportsQueuePage from './pages/moderation/ReportsQueuePage';
import ModerationHistoryPage from './pages/moderation/ModerationHistoryPage';
import ModerationSettingsPage from './pages/moderation/ModerationSettingsPage';
import ReportedUserDetailPage from './pages/moderation/ReportedUserDetailPage';

// ==================== EXPERT MANAGEMENT PAGES ====================
import AvailabilityPage from './pages/expert/AvailabilityPage';
import LeavePage from './pages/expert/LeavePage';
import ExpertRevenuePage from './pages/expert/RevenueDashboardPage';
import ExpertEarningsPage from './pages/expert/EarningsPage';

// ==================== STATIC PAGES ====================
import TermsPage from './pages/static/TermsPage';
import PrivacyPolicyPage from './pages/static/PrivacyPolicyPage';
import PricingPage from './pages/static/PricingPage';
import HelpCenterPage from './pages/static/HelpCenterPage';
import ServicesPage from './pages/static/ServicesPage';
import CareersPage from './pages/static/CareersPage';
import RefundPolicyPage from './pages/static/RefundPolicyPage';

// ==================== ERROR PAGES ====================
import NotFoundPage from './pages/error/NotFoundPage';
import ServerErrorPage from './pages/error/ServerErrorPage';
import UnauthorizedPage from './pages/error/UnauthorizedPage';
import MaintenancePage from './pages/error/MaintenancePage';

// ==================== LAYOUT COMPONENTS ====================
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import AdminNavbar from './components/Admin/AdminNavbar';
import AdminSidebar from './components/Admin/AdminSidebar';

const queryClient = new QueryClient();

// ==================== PROTECTED ROUTE COMPONENTS ====================
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
    return isAuthenticated && user?.role === 'admin' ? <>{children}</> : <Navigate to="/unauthorized" />;
};

const ExpertRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
    return isAuthenticated && (user?.role === 'expert' || user?.role === 'admin') ? <>{children}</> : <Navigate to="/unauthorized" />;
};

const ModeratorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated, isLoading, user } = useAuth();
    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );
    return isAuthenticated && (user?.role === 'moderator' || user?.role === 'admin') ? <>{children}</> : <Navigate to="/unauthorized" />;
};

// ==================== MAIN APP CONTENT ====================
function AppContent() {
    const location = useLocation();

    const isAuthPage = ['/login', '/register', '/forgot-password', '/reset-password'].some(p => location.pathname === p) ||
        location.pathname.startsWith('/verify-email');
    const isErrorPage = ['/404', '/500', '/401', '/403', '/unauthorized', '/maintenance'].includes(location.pathname);
    const isAdminPage = location.pathname.startsWith('/admin');
    const isModerationPage = location.pathname.startsWith('/moderation');
    const isFullscreenPage = location.pathname.startsWith('/consultation/room');
    const hideNavFooter = isAuthPage || isFullscreenPage || isErrorPage;
    const showAdminLayout = isAdminPage || isModerationPage;

    return (
        <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {showAdminLayout ? (
                // ==================== ADMIN LAYOUT ====================
                <div className="flex flex-col min-h-screen">
                    <AdminNavbar />
                    <div className="flex flex-1">
                        <AdminSidebar />
                        <main className="flex-1 overflow-y-auto">
                            <Routes>
                                {/* Admin Dashboard */}
                                <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />

                                {/* Admin Users */}
                                <Route path="/admin/users" element={<AdminRoute><AdminUserManagementPage /></AdminRoute>} />
                                <Route path="/admin/users/:id" element={<AdminRoute><AdminUserDetailPage /></AdminRoute>} />

                                {/* Admin Experts
                                    FIX: /queue phải đứng TRƯỚC /:id để tránh bị match nhầm */}
                                <Route path="/admin/experts/queue" element={<AdminRoute><AdminExpertApprovalQueuePage /></AdminRoute>} />
                                <Route path="/admin/experts/:id" element={<AdminRoute><AdminExpertDetailPage /></AdminRoute>} />
                                <Route path="/admin/experts" element={<AdminRoute><AdminExpertsManagementPage /></AdminRoute>} />

                                {/* Admin Bookings */}
                                <Route path="/admin/bookings" element={<AdminRoute><AdminBookingsManagementPage /></AdminRoute>} />
                                <Route path="/admin/bookings/:id" element={<AdminRoute><AdminBookingDetailPage /></AdminRoute>} />

                                {/* Admin Payments */}
                                <Route path="/admin/payments" element={<AdminRoute><AdminPaymentsManagementPage /></AdminRoute>} />
                                <Route path="/admin/payouts" element={<AdminRoute><AdminPayoutsPage /></AdminRoute>} />

                                {/* Admin Reports */}
                                <Route path="/admin/reports" element={<AdminRoute><AdminReportsPage /></AdminRoute>} />

                                {/* Admin Content */}
                                <Route path="/admin/content" element={<AdminRoute><AdminContentManagementPage /></AdminRoute>} />
                                <Route path="/admin/categories" element={<AdminRoute><AdminCategoriesPage /></AdminRoute>} />
                                <Route path="/admin/tags" element={<AdminRoute><AdminTagsPage /></AdminRoute>} />
                                <Route path="/admin/media" element={<AdminRoute><AdminMediaPage /></AdminRoute>} />

                                {/* Admin Assessments
                                    FIX: /create phải đứng TRƯỚC /:id */}
                                <Route path="/admin/assessments/create" element={<AdminRoute><AdminCreateTestPage /></AdminRoute>} />
                                <Route path="/admin/assessments/:id/edit" element={<AdminRoute><AdminEditTestPage /></AdminRoute>} />
                                <Route path="/admin/assessments/:id" element={<AdminRoute><AdminTestDetailPage /></AdminRoute>} />
                                <Route path="/admin/assessments" element={<AdminRoute><AdminAssessmentsPage /></AdminRoute>} />

                                {/* Admin System */}
                                <Route path="/admin/roles" element={<AdminRoute><AdminRolesPermissionsPage /></AdminRoute>} />
                                <Route path="/admin/settings" element={<AdminRoute><AdminSystemSettingsPage /></AdminRoute>} />
                                <Route path="/admin/notifications" element={<AdminRoute><AdminNotificationsPage /></AdminRoute>} />
                                <Route path="/admin/email-templates" element={<AdminRoute><AdminEmailTemplatesPage /></AdminRoute>} />
                                <Route path="/admin/coupons" element={<AdminRoute><AdminCouponsPage /></AdminRoute>} />
                                <Route path="/admin/promotions" element={<AdminRoute><AdminPromotionsPage /></AdminRoute>} />
                                <Route path="/admin/audit-logs" element={<AdminRoute><AdminAuditLogsPage /></AdminRoute>} />
                                <Route path="/admin/backup" element={<AdminRoute><AdminBackupPage /></AdminRoute>} />
                                <Route path="/admin/api" element={<AdminRoute><AdminAPIPage /></AdminRoute>} />
                                <Route path="/admin/system-health" element={<AdminRoute><AdminSystemHealthPage /></AdminRoute>} />
                                <Route path="/admin/maintenance" element={<AdminRoute><AdminMaintenancePage /></AdminRoute>} />

                                {/* Moderation Routes */}
                                <Route path="/moderation/queue" element={<ModeratorRoute><ModerationQueuePage /></ModeratorRoute>} />
                                <Route path="/moderation/reports" element={<ModeratorRoute><ReportsQueuePage /></ModeratorRoute>} />
                                <Route path="/moderation/history" element={<ModeratorRoute><ModerationHistoryPage /></ModeratorRoute>} />
                                <Route path="/moderation/settings" element={<ModeratorRoute><ModerationSettingsPage /></ModeratorRoute>} />
                                <Route path="/moderation/reports/:id" element={<ModeratorRoute><ReportedUserDetailPage /></ModeratorRoute>} />
                            </Routes>
                        </main>
                    </div>
                </div>
            ) : (
                // ==================== PUBLIC LAYOUT ====================
                <>
                    {!hideNavFooter && <Navbar />}
                    <main className="flex-1">
                        <Routes>
                            {/* ── Public Routes ── */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/faq" element={<FAQPage />} />
                            <Route path="/terms" element={<TermsPage />} />
                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                            <Route path="/pricing" element={<PricingPage />} />
                            <Route path="/help" element={<HelpCenterPage />} />
                            <Route path="/services" element={<ServicesPage />} />
                            <Route path="/careers" element={<CareersPage />} />
                            <Route path="/refund" element={<RefundPolicyPage />} />

                            {/* ── Auth Routes ── */}
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
                            <Route path="/verify-email-notice" element={<VerifyEmailNoticePage />} />

                            {/* ── Expert Routes (Public)
                                FIX: /search phải đứng TRƯỚC /:id */}
                            <Route path="/experts" element={<ExpertsPage />} />
                            <Route path="/experts/search" element={<ExpertSearchPage />} />
                            <Route path="/experts/:id" element={<ExpertDetailPage />} />

                            {/* ── Blog Routes (Public)
                                FIX: /create, /manage phải đứng TRƯỚC /:id
                                     /category/:slug phải đứng TRƯỚC /:id */}
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/create" element={<ExpertRoute><CreateArticlePage /></ExpertRoute>} />
                            <Route path="/blog/manage" element={<ExpertRoute><ManageArticlesPage /></ExpertRoute>} />
                            <Route path="/blog/category/:slug" element={<BlogCategoryPage />} />
                            <Route path="/blog/:id/edit" element={<ExpertRoute><EditArticlePage /></ExpertRoute>} />
                            <Route path="/blog/:id" element={<BlogDetailPage />} />

                            {/* ── Community Routes (Public)
                                FIX: static paths trước dynamic /:id */}
                            <Route path="/community" element={<CommunityHubPage />} />
                            <Route path="/community/groups" element={<SupportGroupsPage />} />
                            <Route path="/community/groups/create" element={<ProtectedRoute><CreateGroupPage /></ProtectedRoute>} />
                            <Route path="/community/groups/:id/edit" element={<ProtectedRoute><EditGroupPage /></ProtectedRoute>} />
                            <Route path="/community/groups/:id/settings" element={<ProtectedRoute><GroupSettingsPage /></ProtectedRoute>} />
                            <Route path="/community/groups/:id" element={<GroupDetailPage />} />
                            <Route path="/community/events" element={<EventsPage />} />
                            <Route path="/community/events/:id" element={<EventDetailPage />} />
                            <Route path="/community/workshops" element={<WorkshopsPage />} />
                            <Route path="/community/share" element={<ProtectedRoute><AnonymousSharingPage /></ProtectedRoute>} />
                            <Route path="/community/my-groups" element={<ProtectedRoute><MyGroupsPage /></ProtectedRoute>} />

                            {/* ── Protected Routes - User ── */}
                            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                            <Route path="/account/settings" element={<ProtectedRoute><AccountSettingsPage /></ProtectedRoute>} />
                            <Route path="/account/delete" element={<ProtectedRoute><DeleteAccountPage /></ProtectedRoute>} />
                            <Route path="/change-password" element={<ProtectedRoute><ChangePasswordPage /></ProtectedRoute>} />
                            <Route path="/saved-articles" element={<ProtectedRoute><SavedArticlesPage /></ProtectedRoute>} />

                            {/* ── Protected Routes - Booking ── */}
                            <Route path="/bookings" element={<ProtectedRoute><BookingsPage /></ProtectedRoute>} />
                            <Route path="/booking/new" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
                            <Route path="/booking/confirm" element={<ProtectedRoute><BookingConfirmationPage /></ProtectedRoute>} />
                            <Route path="/bookings/:id/reschedule" element={<ProtectedRoute><ReschedulePage /></ProtectedRoute>} />
                            <Route path="/bookings/:id/cancel" element={<ProtectedRoute><CancelBookingPage /></ProtectedRoute>} />
                            <Route path="/bookings/:id" element={<ProtectedRoute><BookingDetailPage /></ProtectedRoute>} />

                            {/* ── Protected Routes - Consultation ── */}
                            <Route path="/consultations" element={<ProtectedRoute><ConsultationHistoryPage /></ProtectedRoute>} />
                            <Route path="/consultations/upload" element={<ProtectedRoute><UploadDocumentPage /></ProtectedRoute>} />
                            <Route path="/consultations/:id/notes" element={<ProtectedRoute><SessionNotesPage /></ProtectedRoute>} />
                            <Route path="/consultations/:id/feedback" element={<ProtectedRoute><SessionFeedbackPage /></ProtectedRoute>} />
                            <Route path="/consultations/:id/report" element={<ProtectedRoute><ReportIssuePage /></ProtectedRoute>} />
                            <Route path="/consultations/:id" element={<ProtectedRoute><ConsultationRoomPage /></ProtectedRoute>} />

                            {/* ── Protected Routes - Messaging ── */}
                            <Route path="/inbox" element={<ProtectedRoute><InboxPage /></ProtectedRoute>} />
                            <Route path="/messages/new" element={<ProtectedRoute><NewMessagePage /></ProtectedRoute>} />
                            <Route path="/messages/blocked" element={<ProtectedRoute><BlockedUsersPage /></ProtectedRoute>} />
                            <Route path="/messages/group/:id" element={<ProtectedRoute><GroupChatPage /></ProtectedRoute>} />
                            <Route path="/messages/:id" element={<ProtectedRoute><ChatDetailPage /></ProtectedRoute>} />

                            {/* ── Protected Routes - Tests
                                FIX: /history, /create đứng TRƯỚC /:id */}
                            <Route path="/tests" element={<ProtectedRoute><TestsListPage /></ProtectedRoute>} />
                            <Route path="/tests/history" element={<ProtectedRoute><TestHistoryPage /></ProtectedRoute>} />
                            <Route path="/tests/create" element={<ExpertRoute><CreateTestPage /></ExpertRoute>} />
                            <Route path="/tests/:id/take" element={<ProtectedRoute><TakeTestPage /></ProtectedRoute>} />
                            <Route path="/tests/:id/result" element={<ProtectedRoute><TestResultPage /></ProtectedRoute>} />
                            <Route path="/tests/:id/edit" element={<ExpertRoute><EditTestPage /></ExpertRoute>} />
                            <Route path="/tests/:id" element={<ProtectedRoute><TestDetailPage /></ProtectedRoute>} />

                            {/* ── Protected Routes - Payments ── */}
                            <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
                            <Route path="/payments/methods" element={<ProtectedRoute><PaymentMethodsPage /></ProtectedRoute>} />
                            <Route path="/payments/payout-settings" element={<ExpertRoute><PayoutSettingsPage /></ExpertRoute>} />
                            <Route path="/payments/tax-info" element={<ExpertRoute><TaxInfoPage /></ExpertRoute>} />
                            <Route path="/payments/analytics" element={<ProtectedRoute><PaymentAnalyticsPage /></ProtectedRoute>} />
                            <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
                            <Route path="/transactions" element={<ProtectedRoute><TransactionHistoryPage /></ProtectedRoute>} />
                            <Route path="/invoice/:id" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />
                            <Route path="/refund/request/:id" element={<ProtectedRoute><RefundRequestPage /></ProtectedRoute>} />
                            <Route path="/coupons" element={<ProtectedRoute><CouponPage /></ProtectedRoute>} />
                            <Route path="/promotions" element={<ProtectedRoute><PromotionPage /></ProtectedRoute>} />
                            <Route path="/gift-cards" element={<ProtectedRoute><GiftCardPage /></ProtectedRoute>} />
                            <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
                            <Route path="/billing/address" element={<ProtectedRoute><BillingAddressPage /></ProtectedRoute>} />

                            {/* ── Protected Routes - Notifications ── */}
                            <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                            <Route path="/notifications/settings" element={<ProtectedRoute><NotificationSettingsPage /></ProtectedRoute>} />

                            {/* ── Expert Routes ── */}
                            <Route path="/expert/schedule" element={<ExpertRoute><ExpertSchedulePage /></ExpertRoute>} />
                            <Route path="/expert/availability" element={<ExpertRoute><AvailabilityPage /></ExpertRoute>} />
                            <Route path="/expert/leave" element={<ExpertRoute><LeavePage /></ExpertRoute>} />
                            <Route path="/expert/revenue" element={<ExpertRoute><ExpertRevenuePage /></ExpertRoute>} />
                            <Route path="/expert/earnings" element={<ExpertRoute><ExpertEarningsPage /></ExpertRoute>} />
                            <Route path="/expert/withdraw" element={<ExpertRoute><WithdrawPage /></ExpertRoute>} />

                            {/* ── Error Routes ── */}
                            <Route path="/404" element={<NotFoundPage />} />
                            <Route path="/500" element={<ServerErrorPage />} />
                            <Route path="/401" element={<UnauthorizedPage />} />
                            <Route path="/403" element={<UnauthorizedPage />} />
                            <Route path="/unauthorized" element={<UnauthorizedPage />} />
                            <Route path="/maintenance" element={<MaintenancePage />} />

                            {/* ── Catch-all ── */}
                            <Route path="*" element={<Navigate to="/404" />} />
                        </Routes>
                    </main>
                    {!hideNavFooter && <Footer />}
                </>
            )}

            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        borderRadius: '12px',
                        fontFamily: 'Inter, sans-serif',
                        background: '#fff',
                        color: '#1e293b',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                    },
                    success: {
                        iconTheme: { primary: '#13ecec', secondary: '#fff' },
                    },
                    error: {
                        iconTheme: { primary: '#ef4444', secondary: '#fff' },
                    },
                }}
            />
        </div>
    );
}

// ==================== MAIN APP ====================
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </Router>
        </QueryClientProvider>
    );
}

export default App;