import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//customer
import ViewCart from "./components/customer-components/view-cart-component";
import ViewFavItems from "./components/customer-components/view-fav-items-component";
import OrderHistory from "./components/customer-components/order-history-component";
import Payment from "./components/customer-components/payment";
import OrderedReport from "./components/customer-components/ordered-report-component";

//user management
import SignIn from "./components/userManagement-component/Login/login";
import ForgotPassword from "./components/userManagement-component/forgotPassword/forgotPassword";
import Registration from "./components/userManagement-component/Registration/registration";
import PasswordReset from "./components/userManagement-component/passwordReset/passwordReset";
import UserProfile from "./components/userManagement-component/profile/profile";
import UpdateUserProfile from "./components/userManagement-component/updateProfile/updateProfile";
import userAdminDashboard from "./components/userManagement-component/admin/userAdminDashboard";
import AllRegisteredMemebersDisplay from "./components/userManagement-component/admin/viewAllMembers/allMembersRetrieve";
import UserAdminPrintingReport from "./components/userManagement-component/admin/reportPrint/userAdminReport";

//Delivery Service
import DeliveryDashboard from "./components/delivery-components/delivery-dashboard-component";
import PendingDeliveries from "./components/delivery-components/pending-deliveries-component";
import OngoingDeliveries from "./components/delivery-components/ongoing-deliveries-component";
import CompletedDeliveries from "./components/delivery-components/completed-deliveries-component";
import CancelledDeliveries from "./components/delivery-components/cancelled-deliveries-component";
import NewDelivery from "./components/delivery-components/create-new-delivery-component";
import UpdateDelivery from "./components/delivery-components/update-delivery-component";
import DeliveryReport from "./components/delivery-components/delivery-report-component";

//StoreAdmin
import ItemRetrieve from "./components/storeAdmin-components/itemRetrieve-component";
import storeAdminDashboard from "./components/storeAdmin-components/storeAdminDashboard";
import FooterComponent from "./components/footer-component/footer.component";
import HomePageComponent from "./components/storeAdmin-components/homePageComponent";
import ItemDetails from "./components/storeAdmin-components/itemDetails";
import DeliveryInformation from "./components/delivery-components/delivery-information-component";
import StoreAdminReport from "./components/storeAdmin-components/storeAdmin-report.component";
<link rel="stylesheet" href="./" />;

function App() {
  return (
    <div>
      <Router>
        <div>

          {/* user-Management-Routes */}
          <Route path="/" exact component={SignIn} />
          <Route path="/registration" component={Registration} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/user-password-reset/:id/:token" component={PasswordReset} />
          <Route path="/user-profile" component={UserProfile} />
          <Route path="/update-user-profile" component={UpdateUserProfile} />
          <Route path="/user-admin-dashboard" component={userAdminDashboard} />
          <Route path="/registered-members" component={AllRegisteredMemebersDisplay} />
          <Route path="/user-admin-report" component={UserAdminPrintingReport} />

          {/* Customer */}
          <Route path="/cart/view/" component={ViewCart} />
          <Route path='/fav/view/' component={ViewFavItems} />
          <Route path='/order-history' component={OrderHistory} />
          <Route path='/paymentOrder' component={Payment} />
          <Route path='/orderedReport' component={OrderedReport} />

          <Route path="/delivery-home" component={DeliveryDashboard} />
          <Route path="/delivery-pending" component={PendingDeliveries} />
          <Route path="/delivery-ongoing" component={OngoingDeliveries} />
          <Route path="/delivery-completed" component={CompletedDeliveries} />
          <Route path="/delivery-cancelled" component={CancelledDeliveries} />
          <Route path="/delivery-new" component={NewDelivery} />
          <Route path="/delivery-update" component={UpdateDelivery} />
          <Route path="/delivery-information" component={DeliveryInformation} />
          <Route path="/delivery-report" component={DeliveryReport} />

          {/* storeAdminroutes */}
          <Route path="/storeAdmin" component={ItemRetrieve} />
          <Route path="/storeAdmindash" component={storeAdminDashboard} />
          <Route path="/footer" component={FooterComponent} />
          <Route path="/userHome" component={HomePageComponent} />
          <Route path="/item" component={ItemDetails} />
          <Route path="/storeAdminReport" component={StoreAdminReport} />

        </div>
      </Router >
      <FooterComponent />
    </div>
  );
}

export default App;
