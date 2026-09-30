import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    ArrowDownRight, ArrowRight, Check, ChevronDown, CircleUserRound, Copy, FileImage,
    Heart, Home, MapPin, Menu, Moon, Search, Share2, ShoppingBag, ShoppingCart,
    Store, Sun, X,
} from 'lucide-react';
import { categories, products as seedProducts, stores, suggestions, type Product } from './data';
import { useDemo } from './state';

export function Logo({ compact = false }: { compact?: boolean }) {
    const [missing, setMissing] = useState(false);
    return (
        <Link className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}`} to="/" aria-label="cLink home">
            {!missing ? <img src="/assets/clink-logo.png" alt="Official cLink logo" onError={() => setMissing(true)} /> : (
                <span className="logo-required" role="img" aria-label="Place the official cLink logo at public/assets/clink-logo.png">
                    <FileImage size={17} aria-hidden="true" /><span>Official logo required</span>
                </span>
            )}
        </Link>
    );
}

const discoverLinks = [
    ['Home', '/', Home], ['Explore', '/explore', Search], ['Local', '/local', MapPin],
    ['International', '/international', ArrowRight], ['Global', '/global', ArrowDownRight],
] as const;
const shopLinks = [
    ['Products', '/explore', ShoppingBag], ['Stores', '/explore?type=stores', Store],
    ['Favorites', '/favorites', Heart], ['Cart', '/cart', ShoppingCart], ['Orders', '/orders', Check],
] as const;
const sellerLinks = [
    ['Seller Dashboard', '/seller', CircleUserRound], ['My Store', '/seller/store', Store],
    ['Add Product', '/seller/products?new=1', ShoppingBag], ['Orders', '/seller/orders', Check], ['Sales', '/seller/sales', ArrowRight],
] as const;
const accountLinks = [['Profile', '/profile', CircleUserRound], ['Settings', '/settings', Sun]] as const;

function SearchBox() {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [recent, setRecent] = useState<string[]>(() => {
        try { return JSON.parse(localStorage.getItem('clink-recent-searches') ?? '[]') as string[]; } catch { return []; }
    });
    const navigate = useNavigate();
    const filtered = query.trim()
        ? [...suggestions, ...seedProducts.map((item) => item.name), ...stores.map((item) => item.name), ...categories]
            .filter((item, index, source) => item.toLowerCase().includes(query.toLowerCase()) && source.indexOf(item) === index).slice(0, 6)
        : recent.slice(0, 4);
    const submit = (event?: FormEvent, value = query) => {
        event?.preventDefault();
        if (!value.trim()) return;
        const next = [value.trim(), ...recent.filter((item) => item.toLowerCase() !== value.trim().toLowerCase())].slice(0, 5);
        setRecent(next);
        localStorage.setItem('clink-recent-searches', JSON.stringify(next));
        setQuery(value.trim());
        setOpen(false);
        navigate(`/explore?q=${encodeURIComponent(value.trim())}`);
    };
    return (
        <form className="search-box" role="search" onSubmit={(event) => submit(event)}>
            <Search size={18} aria-hidden="true" />
            <input aria-label="Search products, stores, sellers and services" placeholder="Search products, stores, sellers..." value={query}
                onChange={(event) => { setQuery(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)}
                onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); if (event.key === 'Enter' && filtered[0] && !query.trim()) submit(undefined, filtered[0]); }} />
            {query && <button className="search-clear" type="button" aria-label="Clear search" onClick={() => setQuery('')}><X size={16} /></button>}
            <button className="search-submit" aria-label="Submit search" type="submit"><ArrowRight size={17} /></button>
            {open && filtered.length > 0 && <>
                <button className="search-dismiss" aria-label="Close suggestions" type="button" onClick={() => setOpen(false)} />
                <div className="search-suggestions" role="listbox">
                    <div className="suggestion-label">{query.trim() ? 'SUGGESTIONS' : 'RECENT SEARCHES'}</div>
                    {filtered.map((item, index) => <button key={`${item}-${index}`} type="button" role="option" onClick={() => submit(undefined, item)}>
                        <Search size={15} /><span>{item}</span><ArrowRight size={14} />
                    </button>)}
                    {recent.length > 0 && !query.trim() && <button className="clear-recent" type="button" onClick={() => { setRecent([]); localStorage.removeItem('clink-recent-searches'); }}>Clear recent searches</button>}
                </div>
            </>}
        </form>
    );
}

function MenuSection({ title, links, close }: { title: string; links: readonly (readonly [string, string, typeof Home])[]; close: () => void }) {
    return <section className="menu-section"><h3>{title}</h3>{links.map(([label, path, Icon]) => <NavLink key={label} to={path} onClick={close}><Icon size={17} /><span>{label}</span><ArrowRight size={14} /></NavLink>)}</section>;
}

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, theme, setTheme } = useDemo();
    useEffect(() => setMenuOpen(false), [location.pathname, location.search]);
    useEffect(() => {
        if (!menuOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
        window.addEventListener('keydown', closeOnEscape);
        document.body.classList.add('drawer-open');
        return () => { window.removeEventListener('keydown', closeOnEscape); document.body.classList.remove('drawer-open'); };
    }, [menuOpen]);
    const close = () => setMenuOpen(false);
    return <>
        <header className="site-header">
            <div className="header-inner">
                <Logo />
                <div className="header-search"><SearchBox /></div>
                <nav className="header-nav" aria-label="Main navigation">
                    <NavLink to="/explore">Explore</NavLink><NavLink to="/pricing">Pricing</NavLink><NavLink to="/seller">For Sellers</NavLink>
                </nav>
                <div className="header-actions">
                    <button className="icon-button appearance-quick" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                        {theme === 'light' ? <Moon size={19} /> : <Sun size={19} />}
                    </button>
                    <button className="icon-button cart-header" title="Cart" aria-label={`Cart, ${cart.length} items`} onClick={() => navigate('/cart')}><ShoppingCart size={19} />{cart.length > 0 && <span className="cart-count">{cart.reduce((sum, line) => sum + line.quantity, 0)}</span>}</button>
                    <button className="icon-button profile-header" title="Profile" aria-label="Profile" onClick={() => navigate('/profile')}><CircleUserRound size={21} /></button>
                    <button className={`menu-trigger${menuOpen ? ' is-open' : ''}`} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}<span>Menu</span></button>
                </div>
            </div>
            <div className="mobile-search"><SearchBox /></div>
        </header>
        {menuOpen && <div className="drawer-layer">
            <button className="drawer-scrim" aria-label="Close menu" onClick={close} />
            <aside id="site-menu" className="menu-drawer" aria-label="Site menu">
                <div className="drawer-top"><Logo compact /><button className="icon-button" aria-label="Close menu" onClick={close}><X size={20} /></button></div>
                <div className="drawer-scroll">
                    <MenuSection title="Discover" links={discoverLinks} close={close} />
                    <MenuSection title="Shop" links={shopLinks} close={close} />
                    <MenuSection title="Sell" links={sellerLinks} close={close} />
                    <MenuSection title="Account" links={accountLinks} close={close} />
                    <MenuSection title="Information" links={[
                        ['About cLink', '/about', CircleUserRound], ['Pricing', '/pricing', ShoppingBag],
                    ]} close={close} />
                </div>
                <div className="drawer-bottom"><span>Simple as copying a link.</span><span>DEMO MARKETPLACE</span></div>
            </aside>
        </div>}
    </>;
}

export function Footer() {
    return <footer className="site-footer"><div className="footer-main">
        <div className="footer-brand"><Logo /><p>Simple as copying a link.</p><span>CREATE <b>→</b> cLINK <b>→</b> SHARE <b>→</b> SELL</span></div>
        <div className="footer-links"><div><h3>Explore</h3><Link to="/explore">Products</Link><Link to="/local">Local</Link><Link to="/global">Global</Link></div>
            <div><h3>About</h3><Link to="/about">About cLink</Link><Link to="/pricing">Pricing</Link><Link to="/seller">For Sellers</Link></div>
            <div><h3>Your account</h3><Link to="/profile">Profile</Link><Link to="/settings">Settings</Link><Link to="/orders">Orders</Link></div></div>
    </div><div className="footer-bottom"><span>© 2026 cLink demo. Fictional products and sellers.</span><span>Built for simple, shareable selling.</span></div></footer>;
}

export function ProductCard({ product }: { product: Product }) {
    const { favorites, toggleFavorite, addToCart, notify } = useDemo();
    const favorite = favorites.includes(product.id);
    const copyLink = async () => {
        try { await navigator.clipboard.writeText(`https://clink.local/p/${product.id}`); } catch { /* Clipboard permissions may be unavailable in preview. */ }
        notify('cLink copied!');
    };
    return <article className="product-card">
        <div className="product-image-wrap"><Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}><img src={product.image} alt={product.name} loading="lazy" /></Link>
            {product.originalPrice && <span className="discount-badge">-{Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}
            <button className={`favorite-button${favorite ? ' is-favorite' : ''}`} aria-label={favorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`} aria-pressed={favorite} onClick={() => toggleFavorite(product.id)}><Heart size={18} fill={favorite ? 'currentColor' : 'none'} /></button>
        </div>
        <div className="product-card-body">
            <Link to={`/store/${product.storeId}`} className="product-store"><span>{product.store}</span><span className="store-location"><MapPin size={12} />{product.location}</span></Link>
            <Link to={`/product/${product.id}`} className="product-name">{product.name}</Link>
            <div className="product-meta"><span className="rating-star">★</span><b>{product.rating.toFixed(1)}</b><span>({product.reviews})</span><span className="meta-dot">·</span><span>{product.sold} sold</span></div>
            <div className="product-price-row"><div><strong>₱{product.price.toLocaleString('en-PH')}</strong>{product.originalPrice && <del>₱{product.originalPrice.toLocaleString('en-PH')}</del>}</div><span className="category-mini">{product.category}</span></div>
            <div className="product-actions"><button className="button button-small button-primary" onClick={() => addToCart(product.id)}><ShoppingCart size={15} />Add to cart</button>
                <button className="copy-link-button" aria-label={`Copy cLink for ${product.name}`} title="Copy cLink" onClick={copyLink}><Copy size={16} /></button></div>
        </div>
    </article>;
}

export function ProductGrid({ items, empty = 'No products to show yet.' }: { items: Product[]; empty?: string }) {
    if (!items.length) return <div className="empty-state"><ShoppingBag size={24} /><h3>Nothing here just yet</h3><p>{empty}</p><Link className="button button-outline" to="/explore">Explore products</Link></div>;
    return <div className="product-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}

export function StoreCard({ store }: { store: typeof stores[number] }) {
    const items = seedProducts.filter((product) => product.storeId === store.id);
    return <Link to={`/store/${store.id}`} className="store-card">
        <div className="store-card-image"><img src={store.image} alt={`${store.name} shop`} loading="lazy" /><span>{store.location}</span></div>
        <div className="store-card-info"><span className="store-avatar">{store.name.slice(0, 1)}</span><div><h3>{store.name}</h3><p>{items.length} products <span>·</span> <span className="rating-star">★</span> 4.8</p></div><ArrowRight size={18} /></div>
    </Link>;
}

export function SectionHeading({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text?: string; action?: ReactNode }) {
    return <div className="section-heading"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}

export function Toast() {
    const { toast } = useDemo();
    return <div className={`toast${toast ? ' toast-visible' : ''}`} role="status" aria-live="polite"><Check size={17} /><span>{toast}</span></div>;
}

export function CopyButton({ value, label = 'Copy cLink' }: { value: string; label?: string }) {
    const { notify } = useDemo();
    return <button className="button button-outline" onClick={async () => {
        try { await navigator.clipboard.writeText(value); } catch { /* Clipboard permissions may be unavailable in preview. */ }
        notify('cLink copied!');
    }}><Copy size={16} />{label}</button>;
}

export function ShareButton({ value, label = 'Share' }: { value: string; label?: string }) {
    const { notify } = useDemo();
    return <button className="button button-outline" onClick={async () => {
        try {
            if (navigator.share) await navigator.share({ title: 'cLink', url: value });
            else { await navigator.clipboard.writeText(value); notify('Share link copied'); }
        } catch { notify('Share link ready to copy'); }
    }}><Share2 size={16} />{label}</button>;
}

export function PageTitle({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children?: ReactNode }) {
    return <div className="page-title"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{children}</div>;
}

export function AppShell({ children }: { children: ReactNode }) {
    const location = useLocation();
    useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [location.pathname]);
    return <><Header /><main className="main-content">{children}</main><Footer /><Toast /></>;
}

export function FilterPill({ children }: { children: ReactNode }) { return <span className="filter-pill">{children}<ChevronDown size={14} /></span>; }
