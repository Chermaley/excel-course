
import {Router} from './core/routes/router';
import {ExcelPage} from './pages/ExcelPage';
import {DashboardPage} from './pages/DashboardPage';
import './scss/index.scss';

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
});
