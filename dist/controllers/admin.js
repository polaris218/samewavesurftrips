'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.adminDashboard = adminDashboard;

/* 
|--------------------------------------------------------------------------
| Admin Dashboard
|--------------------------------------------------------------------------
*/
function adminDashboard(req, res) {
    res.render('adminDashboard', { layout: 'admin', random: Math.round(Math.random() * 100000) });
}