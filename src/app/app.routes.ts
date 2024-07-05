import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TradeDataComponent } from './trade-data/trade-data.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guard/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { D3ChartComponent } from './d3-chart/d3-chart.component';
export const routes: Routes = [
    //{ path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '', component: HomeComponent },
    { path: 'd3-chart', component: D3ChartComponent },
    { path: 'trade-data',canActivate: [authGuard], component: TradeDataComponent },
    //{ path: 'trade-data', component: TradeDataComponent },

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'user', canActivate: [authGuard], component: UserComponent },
    //{ path: 'user', component: UserComponent },

];