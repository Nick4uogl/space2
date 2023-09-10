import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Loading from './components/Loading/Loading';
import RequireAuth from './components/RequireAuth/RequireAuth';
const Network = lazy(() => import('./pages/Network/Network'));
const NetworksShareContainer = lazy(() =>
  import('./pages/Networks/NetworksShareContainer'),
);
import NetworksContainer from './pages/Networks/NetworksContainer';
import NotFound from './pages/NotFound/NotFound';
const RecycleBin = lazy(() => import('./pages/Networks/RecycleBin'));
const ChoosePayment = lazy(() => import('./pages/Payment/ChoosePayment'));
// const Invoice = lazy(() => import('./pages/Payment/Invoice'));
const InvoiceForm = lazy(() => import('./pages/Payment/InvoiceForm'));
const PricingCalculator = lazy(() =>
  import('./pages/PricingCalculator/PricingCalculator'),
);
const ResourceDetail = lazy(() => import('./pages/Resources/ResourceDetail'));
const Resources = lazy(() => import('./pages/Resources/Resources'));
const ForgotPassword = lazy(() => import('./pages/SignIn/ForgotPassword'));
const PasswordReset = lazy(() => import('./pages/SignIn/PasswordReset'));
const CompleteSignUp = lazy(() => import('./pages/SignUp/CompleteSignUp'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const WelcomeBack = lazy(() => import('./pages/SignUp/WelcomeBack'));
import Profile from './pages/Profile/Profile';
const ManageSubsctiption = lazy(() =>
  import('./pages/Subscription/ManageSubsctiption'),
);
const OpenedResource = lazy(() =>
  import('./pages/Subscription/OpenedResource'),
);
import ProfileSubscription from './pages/Subscription/ProfileSubscription';
const Success = lazy(() => import('./pages/Success/Success'));

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route
          path="/sign-up"
          element={
            <Suspense fallback={<Loading />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route
          path="/complete-sign-up"
          element={
            <Suspense fallback={<Loading />}>
              <CompleteSignUp />
            </Suspense>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Suspense fallback={<Loading />}>
              <SignIn />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<Loading />}>
              <ForgotPassword />
            </Suspense>
          }
        />
        <Route
          path="/password-reset"
          element={
            <Suspense fallback={<Loading />}>
              <PasswordReset />
            </Suspense>
          }
        />
        <Route
          path="/welcome-back"
          element={
            <Suspense fallback={<Loading />}>
              <WelcomeBack />
            </Suspense>
          }
        />
        <Route
          path="/network/:id"
          element={
            <Suspense fallback={<Loading />}>
              <Network />
            </Suspense>
          }
        />
        <Route
          path="/resources"
          element={
            <Suspense fallback={<Loading />}>
              <Resources />
            </Suspense>
          }
        />
        <Route
          path="/success"
          element={
            <Suspense fallback={<Loading />}>
              <Success />
            </Suspense>
          }
        />
        <Route
          path="/resource-detail/:id"
          element={
            <Suspense fallback={<Loading />}>
              <ResourceDetail />
            </Suspense>
          }
        />
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route
            path="/"
            exact
            element={
              <Suspense fallback={<Loading />}>
                <NetworksContainer />
              </Suspense>
            }
          />
          <Route
            path="/share"
            element={
              <Suspense fallback={<Loading />}>
                <NetworksShareContainer />
              </Suspense>
            }
          />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/subscription" element={<ProfileSubscription />}></Route>
          <Route
            path="/subscription/:id"
            element={
              <Suspense fallback={<Loading />}>
                <OpenedResource />
              </Suspense>
            }
          ></Route>
          <Route
            path="/subscription/manage-subscription"
            element={
              <Suspense fallback={<Loading />}>
                <ManageSubsctiption />
              </Suspense>
            }
          ></Route>
          <Route
            path="/pricing-calculator"
            element={
              <Suspense fallback={<Loading />}>
                <PricingCalculator />
              </Suspense>
            }
          />
          <Route
            path="/choose-payment"
            element={
              <Suspense fallback={<Loading />}>
                <ChoosePayment />
              </Suspense>
            }
          />
          <Route
            path="/invoice-payment"
            element={
              <Suspense fallback={<Loading />}>
                <InvoiceForm />
              </Suspense>
            }
          />
          {/* <Route
            path="/invoice"
            element={
              <Suspense fallback={<Loading />}>
                <Invoice />
              </Suspense>
            }
          /> */}
          <Route
            path="/recycle-bin"
            element={
              <Suspense fallback={<Loading />}>
                <RecycleBin />
              </Suspense>
            }
          />
        </Route>
        <Route path={'/*'} element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
