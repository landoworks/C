import { Link, Route, Routes } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AppShell } from './components';
import {
    AboutPage, CartPage, CheckoutPage, ExplorePage, FavoritesPage, HomePage, OrdersPage,
    PricingPage, ProductPage, ProfilePage, ScopePage, SellerDashboardPage, SellerOrdersPage,
    SellerProductsPage, SellerSalesPage, SellerStorePage, SettingsPage, StorePage,
} from './pages';

function NotFound() {
    return <div className="content-wrap not-found"><span className="eyebrow">THAT LINK WENT SOMEWHERE ELSE</span><h1>Page not found.</h1><p>This cLink demo page doesn’t exist. The marketplace is still right here.</p><div><Link to="/" className="button button-primary"><ArrowLeft size={16} /> Back home</Link><Link to="/explore" className="text-link">Explore instead <ArrowRight size={15} /></Link></div></div>;
}

export function App() {
    return <AppShell><Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/store/:id" element={<StorePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/local" element={<ScopePage scope="local" />} />
        <Route path="/international" element={<ScopePage scope="international" />} />
        <Route path="/global" element={<ScopePage scope="global" />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/seller" element={<SellerDashboardPage />} />
        <Route path="/seller/products" element={<SellerProductsPage />} />
        <Route path="/seller/orders" element={<SellerOrdersPage />} />
        <Route path="/seller/sales" element={<SellerSalesPage />} />
        <Route path="/seller/store" element={<SellerStorePage />} />
        <Route path="*" element={<NotFound />} />
    </Routes></AppShell>;
}
