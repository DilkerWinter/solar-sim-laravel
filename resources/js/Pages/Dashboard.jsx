import AppLayout from '@/Layouts/AppLayout';

function Dashboard() {
    return (
        <h1> Dashboard do sistema </h1>
    );
}

Dashboard.layout = (page) => <AppLayout>{page}</AppLayout>;
export default Dashboard;