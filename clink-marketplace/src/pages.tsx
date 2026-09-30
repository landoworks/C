import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    ArrowDownRight, ArrowRight, BarChart3, Check, ChevronLeft, ChevronRight, CircleHelp,
    Copy, CreditCard, Globe2, Heart, MapPin, Minus, Package, Plus, Search, Settings2,
    Share2, ShoppingBag, ShoppingCart, SlidersHorizontal, Sparkles, Store as StoreIcon,
    Sun, Tag, Trash2, Truck, Users, X,
} from 'lucide-react';
import { categories, demoOrders, products as seedProducts, stores, type Product } from './data';
import {
    CopyButton, PageTitle, ProductGrid, SectionHeading, ShareButton, StoreCard,
} from './components';
import { useDemo } from './state';

const money = (value: number) => `₱${value.toLocaleString('en-PH')}`;
const productLink = (id: string) => `https://clink.local/p/${id}`;

function ProductFlow() {
    return <div className="flow-demo" aria-label="Product to cLink to share to customer">
        <div className="flow-topline"><span>YOUR STORE, READY TO SHARE</span><span className="flow-live"><i /> LIVE DEMO</span></div>
        <div className="flow-product"><img src={seedProducts[0].image} alt="Wireless earbuds listing preview" /><div><span className="flow-caption">PRODUCT</span><strong>Wireless Earbuds</strong><span>₱1,290 <small>· In stock</small></span></div><span className="flow-product-mark"><ShoppingBag size={17} /></span></div>
        <div className="flow-link-row"><div className="flow-step-mark"><span>c</span></div><div className="flow-link-copy"><span className="flow-caption">YOUR SHAREABLE cLINK</span><strong>clink.local/p/earbuds-01</strong></div><button aria-label="Copy demo cLink"><Copy size={16} /></button></div>
        <div className="flow-connectors"><span /><span /><span /></div>
        <div className="flow-endpoints"><span><Share2 size={15} /> SHARE ANYWHERE</span><ArrowRight size={18} /><span><Users size={15} /> CUSTOMER</span></div>
        <div className="flow-footnote"><span><Check size={14} /> Storefront included</span><span><Check size={14} /> No setup fuss</span></div>
    </div>;
}

export function HomePage() {
    const { products } = useDemo();
    const featured = products.slice(0, 4);
    const regions = [
        { id: 'local', number: '01', title: 'Around you', subtitle: 'LOCAL', description: 'Meet sellers and makers from Digos, Davao, Cebu, and across the Philippines.', link: '/local', icon: MapPin, color: 'local' },
        { id: 'international', number: '02', title: 'Across borders', subtitle: 'INTERNATIONAL', description: 'Find independent stores and interesting goods from other countries.', link: '/international', icon: Globe2, color: 'international' },
        { id: 'global', number: '03', title: 'The wider world', subtitle: 'GLOBAL', description: 'Browse the full cLink marketplace, wherever good products come from.', link: '/global', icon: ArrowDownRight, color: 'global' },
    ];
    return <>
        <section className="hero-section"><div className="hero-inner">
            <div className="hero-copy"><span className="hero-kicker"><i /> A simpler way to sell online</span><h1>Sell simply.<br /><em>Share instantly.</em></h1>
                <p>One small link turns your product into a store customers can open anywhere. Create it, share it, and let your next sale find its way to you.</p>
                <div className="hero-actions"><Link className="button button-primary button-large" to="/seller/products?new=1">Start selling <ArrowRight size={17} /></Link><Link className="button button-quiet button-large" to="/explore">Explore products</Link></div>
                <div className="hero-note"><span><Check size={14} /> A storefront in every link</span><span><Check size={14} /> Demo marketplace</span></div>
            </div><ProductFlow />
            <div className="hero-index"><span>CREATE <b>01</b></span><span>cLINK <b>02</b></span><span>SHARE <b>03</b></span><span>SELL <b>04</b></span></div>
        </div></section>

        <section className="content-section explore-preview"><div className="content-wrap">
            <SectionHeading eyebrow="A few good finds" title="Explore the marketplace" text="Discover useful things from independent stores, close to home and further afield." action={<Link className="text-link" to="/explore">Browse everything <ArrowRight size={16} /></Link>} />
            <ProductGrid items={featured} />
        </div></section>

        <section className="discover-band"><div className="content-wrap discover-layout">
            <div className="discover-intro"><span className="eyebrow">A marketplace with room to roam</span><h2>Good things are<br />closer than you think.</h2><p>Browse by what you’re looking for, or follow a trail to a new independent seller.</p><Link to="/explore" className="text-link">Start exploring <ArrowRight size={16} /></Link></div>
            <div className="discovery-types">{[
                ['01', 'Products', 'Useful finds from independent stores', ShoppingBag, '/explore?type=products'],
                ['02', 'Stores', 'Get to know the people behind them', StoreIcon, '/explore?type=stores'],
                ['03', 'Sellers', 'Meet the makers and small businesses', Users, '/explore?type=sellers'],
                ['04', 'Services', 'Skills and ideas ready to share', Sparkles, '/explore?type=services'],
            ].map(([number, label, text, Icon, path]) => <Link key={String(label)} to={String(path)} className="discovery-type"><span>{String(number)}</span><Icon size={18} /><div><h3>{String(label)}</h3><p>{String(text)}</p></div><ArrowRight size={16} /></Link>)}</div>
        </div></section>

        <section className="content-section how-section"><div className="content-wrap">
            <SectionHeading eyebrow="The cLink way" title="Four steps. One simple link." text="Everything you need to take a product from your hands to someone else's." />
            <div className="steps-grid">{[
                ['01', 'CREATE', 'Add your product or service to your cLink store.'],
                ['02', 'cLINK', 'Get a unique page made just for that product.'],
                ['03', 'SHARE', 'Send your link in a message, post, or anywhere.'],
                ['04', 'SELL', 'Receive orders through your own little storefront.'],
            ].map(([number, label, text], index) => <article className="step-item" key={number}><span className="step-number">{number}</span><div className="step-connector"><span style={{ width: index === 3 ? '0' : undefined }} /></div><h3>{label}</h3><p>{text}</p></article>)}</div>
        </div></section>

        <section className="scope-section"><div className="content-wrap"><SectionHeading eyebrow="Find your next favorite" title="Start near. Go anywhere." text="Three ways to discover, depending on how far you want to look." />
            <div className="scope-grid">{regions.map(({ id, number, title, subtitle, description, link, icon: Icon, color }) => <Link className={`scope-card scope-${color}`} key={id} to={link}><div className="scope-card-top"><span>{number} / {subtitle}</span><Icon size={19} /></div><h3>{title}</h3><p>{description}</p><span className="scope-explore">Explore {id} <ArrowRight size={15} /></span></Link>)}</div>
        </div></section>

        <section className="seller-feature"><div className="content-wrap seller-feature-inner"><div><span className="eyebrow">For sellers</span><h2>Your products have places to go.</h2><p>Make a tidy digital storefront, give each product its own cLink, and share your work wherever your customers already are.</p><Link className="button button-light button-large" to="/seller">Meet your seller tools <ArrowRight size={16} /></Link></div><div className="seller-stat-list"><div><span>01</span><strong>A store that feels like yours</strong><p>One home for the things you make and sell.</p></div><div><span>02</span><strong>One link per product</strong><p>Share a direct page, not a long explanation.</p></div><div><span>03</span><strong>Your work, in more places</strong><p>Bring your products into the conversations you’re already having.</p></div></div></div></section>

        <section className="content-section numbers-section"><div className="content-wrap"><div className="demo-numbers-label"><span className="eyebrow">A picture of what’s possible</span><span>ILLUSTRATIVE DEMO NUMBERS</span></div><div className="demo-numbers"><div><strong>3,842</strong><span>Products shared</span></div><div><strong>126</strong><span>Demo sellers</span></div><div><strong>24,580</strong><span>Links created</span></div></div></div></section>

        <section className="final-cta"><div className="content-wrap final-cta-inner"><div><span className="eyebrow">Your next step starts small</span><h2>Ready to create your cLink?</h2><p>Build a store for what you sell. Then send it where the people are.</p></div><Link className="button button-primary button-large" to="/seller/products?new=1">Start selling <ArrowRight size={17} /></Link></div></section>
    </>;
}

const locations = ['Digos', 'Davao City', 'Cebu City', 'Manila', 'Cagayan de Oro', 'Iloilo City', 'Tokyo', 'Singapore', 'Melbourne'];

export function ExplorePage() {
    const { products } = useDemo();
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') ?? '';
    const type = searchParams.get('type') ?? 'products';
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minRating, setMinRating] = useState('');
    const [sort, setSort] = useState('recommended');
    const [filtersOpen, setFiltersOpen] = useState(false);
    const lowered = query.toLowerCase();
    const filtered = useMemo(() => {
        let list = products.filter((product) => !lowered || [product.name, product.store, product.category, product.location, ...product.tags].some((field) => field.toLowerCase().includes(lowered)));
        if (category) list = list.filter((product) => product.category === category);
        if (location) list = list.filter((product) => product.location === location);
        if (maxPrice) list = list.filter((product) => product.price <= Number(maxPrice));
        if (minRating) list = list.filter((product) => product.rating >= Number(minRating));
        if (type === 'services') list = list.filter((product) => product.category === 'Services');
        if (type === 'stores' || type === 'sellers') return list;
        return [...list].sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'rating' ? b.rating - a.rating : b.sold - a.sold);
    }, [products, lowered, category, location, maxPrice, minRating, sort, type]);
    const clearFilters = () => { setCategory(''); setLocation(''); setMaxPrice(''); setMinRating(''); setSort('recommended'); };
    const typeTabs = [['products', 'Products'], ['stores', 'Stores'], ['sellers', 'Sellers'], ['services', 'Services']];
    return <div className="content-wrap page-wrap"><PageTitle eyebrow="The marketplace" title={query ? `Results for “${query}”` : 'Explore'} description="A considered mix of independent products, stores, sellers, and services." />
        <div className="explore-search-row"><label className="explore-search"><Search size={18} /><input value={query} placeholder="What are you looking for?" onChange={(event) => setSearchParams((current) => { const next = new URLSearchParams(current); event.target.value ? next.set('q', event.target.value) : next.delete('q'); return next; })} /><span>Press enter to search</span></label><button className="button button-outline filter-trigger" onClick={() => setFiltersOpen(true)}><SlidersHorizontal size={16} /> Filters</button></div>
        <div className="explore-tabs" role="tablist" aria-label="Browse by type">{typeTabs.map(([id, name]) => <button key={id} role="tab" aria-selected={type === id} className={type === id ? 'active' : ''} onClick={() => setSearchParams((current) => { const next = new URLSearchParams(current); next.set('type', id); return next; })}>{name}<span>{id === 'products' ? filtered.length : id === 'stores' || id === 'sellers' ? stores.length : products.filter((product) => product.category === 'Services').length}</span></button>)}</div>
        <div className="explore-layout"><aside className={`filter-panel${filtersOpen ? ' filter-panel-open' : ''}`}><div className="filter-panel-head"><strong>Filters</strong><button className="icon-button" aria-label="Close filters" onClick={() => setFiltersOpen(false)}><X size={19} /></button></div>
            <label className="field-label">Category<select value={category} onChange={(event) => setCategory(event.target.value)}><option value="">All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="field-label">Location<select value={location} onChange={(event) => setLocation(event.target.value)}><option value="">Anywhere</option>{locations.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="field-label">Maximum price<div className="input-prefix"><span>₱</span><input type="number" min="0" placeholder="Any price" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} /></div></label>
            <label className="field-label">Rating<select value={minRating} onChange={(event) => setMinRating(event.target.value)}><option value="">Any rating</option><option value="4.5">4.5+ stars</option><option value="4">4+ stars</option><option value="3">3+ stars</option></select></label>
            <div className="filter-panel-actions"><button className="button button-quiet" onClick={clearFilters}>Clear all</button><button className="button button-primary" onClick={() => setFiltersOpen(false)}>Show {filtered.length} results</button></div>
        </aside>{filtersOpen && <button className="filter-scrim" aria-label="Close filters" onClick={() => setFiltersOpen(false)} />}
            <div className="explore-results"><div className="results-toolbar"><span><strong>{type === 'products' ? filtered.length : type === 'services' ? filtered.length : stores.length}</strong> {type} to discover</span><label>Sort by <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">Recommended</option><option value="rating">Top rated</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div>
                {type === 'stores' || type === 'sellers' ? <div className="store-grid">{stores.map((store) => <StoreCard key={store.id} store={store} />)}</div> : filtered.length ? <ProductGrid items={filtered} empty="Try a different search or clear some filters." /> : <div className="search-empty"><div><Search size={24} /></div><h2>No results found</h2><p>We couldn’t find a match for “{query}”. Try a different search or browse a category.</p><button className="button button-outline" onClick={() => { setSearchParams(new URLSearchParams()); clearFilters(); }}>Clear search & filters</button></div>}
            </div></div>
    </div>;
}

export function ScopePage({ scope }: { scope: 'local' | 'international' | 'global' }) {
    const { products } = useDemo();
    const labels = {
        local: { eyebrow: 'Philippines', title: 'Close to home.', description: 'Discover local sellers and products from Digos, Davao, Cebu, Manila, and beyond.', places: ['Digos', 'Davao City', 'Cebu City', 'Manila', 'Cagayan de Oro', 'Iloilo City'] },
        international: { eyebrow: 'Across borders', title: 'A little further out.', description: 'Meet independent stores in other countries, all gathered in one place to explore.', places: ['Japan', 'Singapore', 'Australia'] },
        global: { eyebrow: 'The wider marketplace', title: 'A world of good finds.', description: 'Browse a broad mix of products and sellers from every corner of the demo marketplace.', places: ['Every category', 'Every store', 'Everywhere'] },
    }[scope];
    const visible = products.filter((product) => scope === 'global' || product.scope === scope);
    const [activePlace, setActivePlace] = useState('');
    const placeProducts = activePlace ? visible.filter((product) => scope === 'international' ? product.country === activePlace : product.location === activePlace) : visible;
    return <div className={`scope-page scope-page-${scope}`}><div className="scope-page-hero"><div className="content-wrap"><span className="eyebrow">{labels.eyebrow} / {scope.toUpperCase()}</span><h1>{labels.title}</h1><p>{labels.description}</p><span className="scope-count">{visible.length} DEMO FINDS <span>·</span> FICTIONAL SELLERS</span></div></div>
        <div className="content-wrap page-wrap"><div className="place-chips"><button className={!activePlace ? 'active' : ''} onClick={() => setActivePlace('')}>{scope === 'global' ? 'All areas' : 'All locations'}</button>{labels.places.map((place) => <button key={place} className={activePlace === place ? 'active' : ''} onClick={() => setActivePlace(activePlace === place ? '' : place)}>{place}</button>)}</div>
            <SectionHeading eyebrow={scope === 'local' ? 'Made nearby' : scope === 'international' ? 'Independent finds' : 'Across the marketplace'} title={activePlace || (scope === 'local' ? 'From our part of the world' : scope === 'international' ? 'From other places' : 'A little bit of everything')} text="Every listing is part of this illustrative cLink demo." />
            <ProductGrid items={placeProducts} empty="No demo products in this location yet. Choose another place to keep exploring." />
        </div></div>;
}

export function ProductPage() {
    const { id } = useParams();
    const { products, favorites, toggleFavorite, addToCart } = useDemo();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const product = products.find((item) => item.id === id);
    if (!product) return <div className="content-wrap page-wrap"><div className="search-empty"><h2>Product not found</h2><p>This demo listing may have been removed.</p><Link to="/explore" className="button button-primary">Back to explore</Link></div></div>;
    const favorite = favorites.includes(product.id);
    return <div className="content-wrap product-detail-page"><div className="breadcrumbs"><Link to="/explore">Explore</Link><ChevronRight size={14} /><Link to={`/explore?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><ChevronRight size={14} /><span>{product.name}</span></div>
        <div className="product-detail-layout"><div className="detail-gallery"><div className="detail-main-image"><img src={product.image} alt={product.name} /></div><div className="detail-image-caption"><span>DEMO LISTING</span><span>01 / 01</span></div></div>
            <div className="product-detail-info"><Link className="detail-store" to={`/store/${product.storeId}`}><span className="store-avatar">{product.store.slice(0, 1)}</span><span><strong>{product.store}</strong><small><MapPin size={13} /> {product.location} · Demo seller</small></span><ArrowRight size={16} /></Link>
                <span className="eyebrow">{product.category}</span><h1>{product.name}</h1><div className="detail-rating"><span className="rating-star">★</span><strong>{product.rating.toFixed(1)}</strong><a href="#reviews">{product.reviews} reviews</a><span>·</span><span>{product.sold} sold</span></div>
                <div className="detail-price"><strong>{money(product.price)}</strong>{product.originalPrice && <><del>{money(product.originalPrice)}</del><span className="discount-badge">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</span></>}</div>
                <p className="detail-description">{product.description}</p><div className="detail-stock"><span className="stock-dot" /> In stock <span>·</span> {product.stock} available in this demo</div>
                <div className="detail-quantity-row"><span>Quantity</span><div className="quantity-control"><button aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((value) => value - 1)}><Minus size={15} /></button><span>{quantity}</span><button aria-label="Increase quantity" disabled={quantity >= product.stock} onClick={() => setQuantity((value) => value + 1)}><Plus size={15} /></button></div></div>
                <div className="detail-actions"><button className="button button-primary button-large" onClick={() => addToCart(product.id, quantity)}><ShoppingCart size={17} /> Add to cart</button><button className="button button-navy button-large" onClick={() => { addToCart(product.id, quantity); navigate('/checkout'); }}>Order now <ArrowRight size={17} /></button><button className={`icon-button detail-favorite${favorite ? ' is-favorite' : ''}`} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={favorite} onClick={() => toggleFavorite(product.id)}><Heart size={19} fill={favorite ? 'currentColor' : 'none'} /></button></div>
                <div className="detail-share-row"><CopyButton value={productLink(product.id)} label="Copy cLink" /><ShareButton value={productLink(product.id)} label="Share" /></div>
                <div className="detail-service-notes"><span><Truck size={16} /> Delivery options shown at checkout</span><span><CircleHelp size={16} /> Demo product; no real purchase</span></div>
            </div></div>
        <div className="detail-more"><SectionHeading eyebrow="More from this seller" title="Keep looking around" action={<Link className="text-link" to={`/store/${product.storeId}`}>Visit store <ArrowRight size={16} /></Link>} /><ProductGrid items={products.filter((item) => item.storeId === product.storeId && item.id !== product.id).slice(0, 4)} empty="This seller is just getting started." /></div>
    </div>;
}

export function StorePage() {
    const { id = '' } = useParams();
    const { products } = useDemo();
    const store = stores.find((item) => item.id === id) ?? (id === 'my-store' ? { id: 'my-store', name: 'Your cLink Store', location: 'Davao City', country: 'Philippines', description: 'A home for your products and the things you love to make.', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85' } : undefined);
    if (!store) return <div className="content-wrap page-wrap"><div className="search-empty"><h2>Store not found</h2><Link className="button button-primary" to="/explore?type=stores">Browse stores</Link></div></div>;
    const items = products.filter((product) => product.storeId === store.id);
    return <div className="content-wrap page-wrap store-page"><div className="store-hero"><img src={store.image} alt="" /><div className="store-hero-shade" /><div className="store-hero-content"><span className="eyebrow">INDEPENDENT cLINK STORE</span><h1>{store.name}</h1><span><MapPin size={15} /> {store.location}, {store.country}</span><p>{store.description}</p><div className="store-hero-actions"><CopyButton value={`https://clink.local/store/${store.id}`} label="Copy store cLink" /><ShareButton value={`https://clink.local/store/${store.id}`} label="Share store" /></div></div></div>
        <div className="store-summary"><div><strong>{items.length}</strong><span>Products</span></div><div><strong>4.8</strong><span>Store rating</span></div><div><strong>Demo</strong><span>Independent seller</span></div><Link to="/explore?type=stores" className="text-link">More stores <ArrowRight size={15} /></Link></div>
        <SectionHeading eyebrow="From this store" title="The collection" text="Fictional products, made for this clickable prototype." /><ProductGrid items={items} empty="This demo store has no listings yet." />
    </div>;
}

export function PricingPage() {
    const { selectedPlan, selectPlan, notify } = useDemo();
    const plans = [
        { name: 'BASIC', price: 100, description: 'For individuals and small sellers who want a simple online selling presence.', features: ['cLink store', 'Product listings', 'Basic customization', 'Product sharing', 'Order management', 'Basic analytics'] },
        { name: 'PRO', price: 250, description: 'For growing sellers who need more tools.', features: ['Everything in Basic', 'More product listings', 'Better customization', 'Enhanced analytics', 'Seller tools', 'Promotional tools'], popular: true },
        { name: 'MAX', price: 350, description: 'For sellers who want the complete cLink experience.', features: ['Everything in Pro', 'Advanced analytics', 'Larger product capacity', 'Advanced customization', 'Enhanced seller tools', 'Advanced promotional tools'] },
    ];
    return <div className="content-wrap page-wrap pricing-page"><PageTitle eyebrow="Simple plans, clear choices" title="More room to grow." description="A plan for the way you sell today, with space for wherever you’re headed. Plans are demo selections only; no payments are collected." />
        <div className="pricing-grid">{plans.map((plan) => <article key={plan.name} className={`pricing-card${plan.popular ? ' pricing-popular' : ''}`}>
            {plan.popular && <span className="popular-label">A LITTLE MORE ROOM</span>}<span className="pricing-plan">{plan.name}</span><p>{plan.description}</p><div className="plan-price"><strong>₱{plan.price}</strong><span>/ month<br />demo plan</span></div><button className={`button ${selectedPlan === plan.name ? 'button-outline' : 'button-primary'} plan-button`} onClick={() => { selectPlan(plan.name); notify(`${plan.name} demo plan selected`); }}>{selectedPlan === plan.name ? <><Check size={16} /> Selected</> : <>Choose {plan.name} <ArrowRight size={16} /></>}</button><div className="plan-rule" /><ul>{plan.features.map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
        </article>)}</div><p className="demo-disclaimer"><CircleHelp size={15} /> All plan prices and selections are for this prototype only. No subscription or payment is created.</p>
    </div>;
}

export function AboutPage() {
    return <div className="about-page"><section className="about-hero"><div className="content-wrap about-hero-inner"><span className="eyebrow">A little about cLink</span><h1>Good products deserve<br />an easy way out into<br /><em>the world.</em></h1><p>cLink is a simple idea: give every seller a digital home, and every product a link that’s easy to share.</p><Link to="/explore" className="button button-primary">Explore the marketplace <ArrowRight size={16} /></Link></div><div className="about-image"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85" alt="Small business owners working together at a table" /><span>SMALL BUSINESS, BIG PLACES TO GO</span></div></section>
        <section className="content-wrap about-principles"><div><span className="eyebrow">WHY WE’RE HERE</span><h2>Less setup.<br />More sharing.</h2></div><div className="about-principle-list"><article><span>01</span><div><h3>Selling should feel simpler.</h3><p>A clear storefront helps independent sellers spend more time on their products and less time figuring out where to put them online.</p></div></article><article><span>02</span><div><h3>Every product can travel.</h3><p>A cLink turns a product into a direct, shareable page. Send it to a friend, post it, or bring it into a conversation.</p></div></article><article><span>03</span><div><h3>Local stories belong everywhere.</h3><p>We want neighborhood sellers to reach the people nearby and the people they have yet to meet beyond their immediate area.</p></div></article></div></section>
        <section className="about-cta"><div className="content-wrap"><span className="eyebrow">A small link can go a long way</span><h2>Make something.<br /><em>Give it a cLink.</em></h2><Link className="button button-light" to="/seller/products?new=1">Create a product <ArrowRight size={16} /></Link></div></section></div>;
}

export function CartPage() {
    const { cart, products, setQuantity, removeFromCart } = useDemo();
    const lines = cart.map((line) => ({ ...line, product: products.find((item) => item.id === line.productId) })).filter((line) => line.product);
    const subtotal = lines.reduce((sum, line) => sum + line.product!.price * line.quantity, 0);
    const delivery = subtotal > 0 ? 85 : 0;
    return <div className="content-wrap page-wrap"><PageTitle eyebrow="Your bag" title="Cart" description={`${lines.reduce((sum, line) => sum + line.quantity, 0)} items · demo checkout only`} />
        {!lines.length ? <div className="cart-empty"><div><ShoppingCart size={27} /></div><h2>Your cart is taking a breather.</h2><p>Add a product to see it here. No purchase will be made in this demo.</p><Link className="button button-primary" to="/explore">Explore products <ArrowRight size={16} /></Link></div> : <div className="cart-layout"><div className="cart-lines">{lines.map(({ product, quantity }) => <article className="cart-line" key={product!.id}><Link to={`/product/${product!.id}`} className="cart-line-image"><img src={product!.image} alt={product!.name} /></Link><div className="cart-line-info"><Link to={`/product/${product!.id}`} className="cart-line-name">{product!.name}</Link><Link to={`/store/${product!.storeId}`} className="cart-line-store">{product!.store} · {product!.location}</Link><span className="cart-line-price">{money(product!.price)}</span><div className="quantity-control"><button aria-label={`Decrease ${product!.name} quantity`} disabled={quantity <= 1} onClick={() => setQuantity(product!.id, quantity - 1)}><Minus size={14} /></button><span>{quantity}</span><button aria-label={`Increase ${product!.name} quantity`} onClick={() => setQuantity(product!.id, quantity + 1)}><Plus size={14} /></button></div></div><div className="cart-line-end"><strong>{money(product!.price * quantity)}</strong><button className="icon-button remove-line" aria-label={`Remove ${product!.name}`} onClick={() => removeFromCart(product!.id)}><Trash2 size={17} /></button></div></article>)}</div>
            <aside className="order-summary"><span className="eyebrow">DEMO CHECKOUT</span><h2>Order summary</h2><div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-row"><span>Simulated delivery</span><strong>{money(delivery)}</strong></div><p className="summary-note">Delivery cost is an example only and may vary by address.</p><div className="summary-total"><span>Total</span><strong>{money(subtotal + delivery)}</strong></div><Link className="button button-primary button-full" to="/checkout">Continue to checkout <ArrowRight size={16} /></Link><div className="demo-note"><CircleHelp size={15} /><span>This prototype does not process payments or real orders.</span></div></aside></div>}
    </div>;
}

export function CheckoutPage() {
    const { cart, products, placeOrder } = useDemo();
    const [order, setOrder] = useState<{ id: string; total: number } | null>(null);
    const subtotal = cart.reduce((sum, line) => sum + (products.find((item) => item.id === line.productId)?.price ?? 0) * line.quantity, 0);
    const total = subtotal + (subtotal > 0 ? 85 : 0);
    const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); const newOrder = placeOrder(); setOrder({ id: newOrder.id, total: newOrder.total }); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    if (order) return <div className="content-wrap checkout-success"><div className="success-mark"><Check size={28} /></div><span className="eyebrow">DEMO ORDER CONFIRMATION</span><h1>Order placed<br /><em>successfully.</em></h1><p>Your order has been added to the demo order history. No payment has been processed.</p><div className="success-order-number"><span>ORDER NUMBER</span><strong>#{order.id}</strong><span>STATUS <b>PREPARING</b></span></div><div className="success-actions"><Link to="/orders" className="button button-primary">View your orders <ArrowRight size={16} /></Link><Link to="/explore" className="button button-outline">Keep exploring</Link></div></div>;
    if (!cart.length) return <div className="content-wrap page-wrap"><div className="cart-empty"><div><ShoppingCart size={27} /></div><h2>Nothing to check out yet.</h2><p>Add something from the marketplace first.</p><Link className="button button-primary" to="/explore">Explore products</Link></div></div>;
    return <div className="content-wrap page-wrap"><div className="checkout-top"><Link to="/cart" className="back-link"><ChevronLeft size={16} /> Back to cart</Link><span className="eyebrow">A SIMULATED ORDER, NOTHING MORE</span><h1>Checkout</h1><p>Place a demo order. No money changes hands here.</p></div>
        <form className="checkout-layout" onSubmit={submit}><div className="checkout-form"><section className="checkout-section"><span className="checkout-step">01</span><div><h2>Delivery details</h2><p>Where should this demo order go?</p></div><div className="checkout-fields"><label className="field-label">Full name<input required name="name" placeholder="e.g. Alex Santos" autoComplete="name" /></label><label className="field-label">Contact number<input required name="contact" type="tel" placeholder="09XX XXX XXXX" autoComplete="tel" /></label><label className="field-label field-full">Delivery address<textarea required name="address" rows={3} placeholder="House number, street, barangay, city" autoComplete="street-address" /></label><label className="field-label">Delivery option<select name="delivery"><option>Standard delivery · ₱85</option><option>Local pickup · Free (demo)</option><option>Express delivery · ₱150 (demo)</option></select></label></div></section>
            <section className="checkout-section"><span className="checkout-step">02</span><div><h2>Payment method</h2><p>Visual demo only. No payment is collected.</p></div><div className="payment-options"><label><input type="radio" name="payment" value="cod" defaultChecked /><span className="payment-radio" /><span><strong>Cash on Delivery</strong><small>Pay when your demo order arrives</small></span><Truck size={18} /></label><label><input type="radio" name="payment" value="gcash" /><span className="payment-radio" /><span><strong>GCash</strong><small>Visual option only · not connected</small></span><CreditCard size={18} /></label><label><input type="radio" name="payment" value="card" /><span className="payment-radio" /><span><strong>Card</strong><small>Visual option only · not connected</small></span><CreditCard size={18} /></label></div></section></div>
            <aside className="order-summary"><span className="eyebrow">{cart.reduce((sum, line) => sum + line.quantity, 0)} ITEMS</span><h2>Your order</h2>{cart.map((line) => { const item = products.find((product) => product.id === line.productId); return item ? <div key={line.productId} className="checkout-line"><img src={item.image} alt="" /><span>{line.quantity} × {item.name}</span><strong>{money(item.price * line.quantity)}</strong></div> : null; })}<div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div><div className="summary-row"><span>Delivery</span><strong>₱85</strong></div><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div><button className="button button-primary button-full" type="submit">Place demo order <ArrowRight size={16} /></button><div className="demo-note"><CircleHelp size={15} /><span>Payment methods are not connected. This order is stored locally in your browser.</span></div></aside>
        </form></div>;
}

export function OrdersPage() {
    const { orders } = useDemo();
    const tabs = ['All', 'Preparing', 'In Transit', 'Delivered', 'Cancelled'];
    const [active, setActive] = useState('All');
    const visible = active === 'All' ? orders : orders.filter((order) => order.status === active);
    return <div className="content-wrap page-wrap"><PageTitle eyebrow="Your purchases" title="Orders" description="A clear view of what you’ve ordered in this demo." />
        <div className="status-tabs" role="tablist" aria-label="Filter orders">{tabs.map((tab) => <button key={tab} role="tab" aria-selected={active === tab} className={active === tab ? 'active' : ''} onClick={() => setActive(tab)}>{tab}<span>{tab === 'All' ? orders.length : orders.filter((order) => order.status === tab).length}</span></button>)}</div>
        <div className="orders-list">{visible.map((order) => <article className="order-card" key={order.id}><div className="order-card-heading"><div><span>ORDER {order.id}</span><small>{order.date}</small></div><span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></div><div className="order-card-body"><div className="order-symbol"><Package size={20} /></div><div><strong>{order.items}</strong><span>{order.store}</span></div><strong>{money(order.total)}</strong></div><div className="order-card-footer"><span>DEMO ORDER · NO PAYMENT PROCESSED</span><button className="text-link" onClick={() => window.alert(`Demo order ${order.id}\n${order.items}\nStatus: ${order.status}`)}>Order details <ArrowRight size={15} /></button></div></article>)}</div>
        {!visible.length && <div className="empty-state"><Package size={25} /><h3>No {active.toLowerCase()} orders</h3><p>Orders in this status will appear here.</p></div>}
    </div>;
}

export function FavoritesPage() {
    const { favorites, products } = useDemo();
    return <div className="content-wrap page-wrap"><PageTitle eyebrow="Saved for later" title="Favorites" description="Good finds you’ve kept close. Saved locally in this browser." /><ProductGrid items={products.filter((product) => favorites.includes(product.id))} empty="Tap the heart on a product to save it here." /></div>;
}

export function ProfilePage() {
    const { favorites, cart, orders, products } = useDemo();
    const menu = [['My Profile', '/profile'], ['My Orders', '/orders'], ['Favorites', '/favorites'], ['My Store', '/seller/store'], ['My cLinks', '/seller/products'], ['Settings', '/settings']];
    return <div className="content-wrap page-wrap"><PageTitle eyebrow="Your cLink account" title="Profile" description="Your place to pick up where you left off." />
        <div className="profile-layout"><aside className="profile-sidebar"><div className="profile-avatar">AS</div><strong>Alex Santos</strong><span>@alexmakes</span><span className="account-type">BUYER + SELLER</span><nav>{menu.map(([label, path]) => <Link className={path === '/profile' ? 'active' : ''} key={label} to={path}>{label}<ArrowRight size={14} /></Link>)}</nav></aside>
            <div className="profile-main"><section className="profile-welcome"><span className="eyebrow">YOUR PROFILE</span><h2>Hello, Alex.</h2><p>Small things you can do from here.</p><Link to="/settings" className="text-link">Edit profile details <ArrowRight size={15} /></Link></section>
                <div className="profile-quick-stats"><Link to="/orders"><strong>{orders.length}</strong><span>Orders</span><ArrowRight size={15} /></Link><Link to="/favorites"><strong>{favorites.length}</strong><span>Favorites</span><Heart size={15} /></Link><Link to="/seller/store"><strong>1</strong><span>Store</span><StoreIcon size={15} /></Link><Link to="/seller/products"><strong>{products.length}</strong><span>Shared cLinks</span><Share2 size={15} /></Link></div>
                <div className="profile-details"><div><span>NAME</span><strong>Alex Santos</strong></div><div><span>USERNAME</span><strong>@alexmakes</strong></div><div><span>EMAIL</span><strong>alex@example.com</strong></div><div><span>ACCOUNT TYPE</span><strong>Buyer and seller</strong></div></div>
                <div className="profile-action-row"><div><h3>Your seller space</h3><p>Manage products, store details, and demo orders.</p></div><Link to="/seller" className="button button-outline">Open dashboard <ArrowRight size={15} /></Link></div>
            </div></div>
    </div>;
}

export function SettingsPage() {
    const { theme, setTheme, settings, setSetting, notify } = useDemo();
    const toggles = [
        ['orderNotifications', 'Order updates', 'Updates when a demo order status changes.'],
        ['sellerNotifications', 'Seller activity', 'New orders and store activity in your seller space.'],
        ['marketingNotifications', 'Product news', 'Occasional updates about cLink features.'],
        ['accountVisibility', 'Public profile', 'Let other people see your public seller profile.'],
        ['dataPreferences', 'Local demo data', 'Keep your demo preferences in this browser.'],
    ];
    return <div className="content-wrap page-wrap settings-page"><PageTitle eyebrow="Make it yours" title="Settings" description="A few controls for your cLink demo experience." />
        <div className="settings-layout"><aside className="settings-nav"><a href="#account">Account</a><a href="#appearance">Appearance</a><a href="#notifications">Notifications</a><a href="#privacy">Privacy</a><a href="#general">General</a><a href="#about-settings">About</a></aside>
            <div className="settings-sections"><section id="account" className="settings-section"><div><span className="eyebrow">ACCOUNT</span><h2>Your account</h2><p>Profile and sign-in details for this local demo.</p></div><div className="settings-account-rows"><Link to="/profile"><span>Profile details</span><strong>Alex Santos · @alexmakes</strong><ArrowRight size={16} /></Link><div><span>Email address</span><strong>alex@example.com</strong><ArrowRight size={16} /></div><div><span>Password</span><strong>••••••••</strong><ArrowRight size={16} /></div></div></section>
                <section id="appearance" className="settings-section"><div><span className="eyebrow">APPEARANCE</span><h2>A place that feels right.</h2><p>Choose the cLink palette you’d like to use. Your choice stays in this browser.</p></div><div className="theme-options"><button className={`theme-option theme-preview-light${theme === 'light' ? ' selected' : ''}`} aria-pressed={theme === 'light'} onClick={() => setTheme('light')}><span className="theme-preview"><i /><i /><i /></span><span><Sun size={16} /> Light mode</span>{theme === 'light' && <Check size={16} />}</button><button className={`theme-option theme-preview-dark${theme === 'dark' ? ' selected' : ''}`} aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}><span className="theme-preview"><i /><i /><i /></span><span><Sun size={16} /> Dark mode</span>{theme === 'dark' && <Check size={16} />}</button></div></section>
                <section id="notifications" className="settings-section"><div><span className="eyebrow">NOTIFICATIONS</span><h2>What you hear from us.</h2><p>Preferences are saved locally and never sent anywhere.</p></div><div className="setting-toggles">{toggles.slice(0, 3).map(([key, title, text]) => <label className="setting-toggle" key={key}><span><strong>{title}</strong><small>{text}</small></span><input type="checkbox" checked={Boolean(settings[key])} onChange={(event) => setSetting(key, event.target.checked)} /><i /></label>)}</div></section>
                <section id="privacy" className="settings-section"><div><span className="eyebrow">PRIVACY</span><h2>Your choices.</h2><p>Control what is visible and how this prototype stores your settings.</p></div><div className="setting-toggles">{toggles.slice(3).map(([key, title, text]) => <label className="setting-toggle" key={key}><span><strong>{title}</strong><small>{text}</small></span><input type="checkbox" checked={Boolean(settings[key])} onChange={(event) => setSetting(key, event.target.checked)} /><i /></label>)}</div></section>
                <section id="general" className="settings-section"><div><span className="eyebrow">GENERAL</span><h2>Language & currency.</h2><p>Display preferences for the demo marketplace.</p></div><div className="settings-account-rows"><label><span>Language</span><select defaultValue="English"><option>English</option><option>Filipino</option></select></label><label><span>Currency</span><select defaultValue="PHP · Philippine peso"><option>PHP · Philippine peso</option><option>USD · US dollar</option></select></label></div></section>
                <section id="about-settings" className="settings-section"><div><span className="eyebrow">ABOUT</span><h2>About cLink.</h2><p>This is a local interactive prototype. No real account, transaction, or subscription is created.</p></div><div className="settings-account-rows"><Link to="/about"><span>About cLink</span><ArrowRight size={16} /></Link><button onClick={() => notify('Terms are part of this demo only')}><span>Terms</span><ArrowRight size={16} /></button><button onClick={() => notify('Privacy details are part of this demo only')}><span>Privacy</span><ArrowRight size={16} /></button></div></section>
            </div></div>
    </div>;
}

const sellerNav = [['Overview', '/seller', BarChart3], ['Products', '/seller/products', Package], ['Orders', '/seller/orders', ShoppingBag], ['Sales', '/seller/sales', Tag], ['Store', '/seller/store', StoreIcon], ['Settings', '/settings', Settings2]] as const;
function SellerFrame({ children, current }: { children: React.ReactNode; current: string }) {
    return <div className="seller-app"><aside className="seller-sidebar"><span className="seller-space-label">SELLER SPACE</span><div className="seller-store-switch"><span className="store-avatar">A</span><span><strong>Alex's Store</strong><small>Davao City</small></span><ChevronDown size={15} /></div><nav>{sellerNav.map(([label, to, Icon]) => <Link key={label} className={current === label ? 'active' : ''} to={to}><Icon size={17} />{label}{label === 'Orders' && <span className="nav-count">3</span>}</Link>)}</nav><div className="seller-sidebar-bottom"><div className="seller-help"><CircleHelp size={18} /><span><strong>Need a hand?</strong><small>Visit the Help Centre</small></span></div><Link to="/profile"><span className="profile-avatar-small">AS</span><span><strong>Alex Santos</strong><small>Seller account</small></span><ChevronDown size={14} /></Link></div></aside><section className="seller-main">{children}</section></div>;
}

export function SellerDashboardPage() {
    const { products, orders } = useDemo();
    const userProducts = products.filter((product) => product.storeId === 'my-store');
    return <SellerFrame current="Overview"><div className="seller-page-heading"><div><span className="eyebrow">TUESDAY, SEPTEMBER 30, 2026</span><h1>Good morning, Alex.</h1><p>Here’s a quick look at your seller space.</p></div><Link to="/seller/products?new=1" className="button button-primary"><Plus size={16} /> Add a product</Link></div>
        <div className="seller-demo-banner"><span><Sparkles size={17} /> DEMO SELLER DASHBOARD</span><p>All listings, orders, and sales figures here are illustrative. Nothing is connected to a real business.</p></div>
        <div className="seller-metrics"><article><span>PRODUCTS</span><strong>{userProducts.length}</strong><small><Package size={14} /> {userProducts.length ? 'Your active listings' : 'Ready for your first listing'}</small></article><article><span>ORDERS</span><strong>{orders.length}</strong><small><ShoppingBag size={14} /> Demo order history</small></article><article><span>SIMULATED SALES</span><strong>{money(48650)}</strong><small><BarChart3 size={14} /> Illustrative revenue</small></article><article><span>STORE VISITS</span><strong>1,284</strong><small><Users size={14} /> Demo traffic</small></article><article><span>cLINK SHARES</span><strong>347</strong><small><Share2 size={14} /> Illustrative share count</small></article></div>
        <div className="seller-dashboard-grid"><section className="seller-panel sales-overview"><div className="seller-panel-heading"><div><span className="eyebrow">SALES ACTIVITY</span><h2>Your store at a glance</h2></div><select defaultValue="7 days"><option>7 days</option><option>30 days</option><option>12 months</option></select></div><div className="sales-chart"><div className="chart-y-labels"><span>₱8k</span><span>₱6k</span><span>₱4k</span><span>₱2k</span><span>₱0</span></div><div className="chart-area"><div className="chart-gridlines"><i /><i /><i /><i /><i /></div><svg viewBox="0 0 700 190" preserveAspectRatio="none" role="img" aria-label="Demo sales trend rising over the last seven days"><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4d8fce" stopOpacity=".20" /><stop offset="1" stopColor="#4d8fce" stopOpacity="0" /></linearGradient></defs><path className="chart-area-fill" d="M0 150 C45 140 54 118 100 128 S165 114 200 96 S260 125 300 102 S360 82 400 95 S470 48 500 71 S560 68 600 35 S665 45 700 18 V190 H0Z" /><path className="chart-line" d="M0 150 C45 140 54 118 100 128 S165 114 200 96 S260 125 300 102 S360 82 400 95 S470 48 500 71 S560 68 600 35 S665 45 700 18" /></svg><div className="chart-x-labels"><span>Sep 24</span><span>Sep 25</span><span>Sep 26</span><span>Sep 27</span><span>Sep 28</span><span>Sep 29</span><span>Today</span></div></div></div><div className="chart-summary"><strong>₱18,420 <span>DEMO SALES</span></strong><span className="chart-up">+12.8% <small>vs. last week (demo)</small></span></div></section>
            <section className="seller-panel seller-orders"><div className="seller-panel-heading"><div><span className="eyebrow">RECENT ORDERS</span><h2>Latest activity</h2></div><Link to="/seller/orders" className="text-link">All orders <ArrowRight size={14} /></Link></div><div className="seller-order-list">{orders.slice(0, 4).map((order) => <div key={order.id}><span className="order-mini-icon"><Package size={16} /></span><span><strong>{order.id}</strong><small>{order.items.slice(0, 33)}{order.items.length > 33 ? '…' : ''}</small></span><span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></div>)}</div></section>
        </div><div className="seller-quick-links"><Link to="/seller/products"><Package size={18} /><span><strong>Manage products</strong><small>Listings and inventory</small></span><ArrowRight size={15} /></Link><Link to="/seller/store"><StoreIcon size={18} /><span><strong>Edit your store</strong><small>Make it feel like yours</small></span><ArrowRight size={15} /></Link><Link to="/seller/sales"><BarChart3 size={18} /><span><strong>Review performance</strong><small>Demo sales insights</small></span><ArrowRight size={15} /></Link></div>
    </SellerFrame>;
}

function ProductEditor({ initial, onSave, onCancel }: { initial?: Product; onSave: (product: Product) => void; onCancel: () => void }) {
    const { notify } = useDemo();
    const [preview, setPreview] = useState(initial?.image ?? '');
    const [imageText, setImageText] = useState(initial?.image ?? '');
    const onImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => { const result = String(reader.result); setPreview(result); setImageText(result); };
        reader.readAsDataURL(file);
    };
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const name = String(form.get('name')).trim();
        const id = initial?.id ?? `my-product-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${Date.now().toString().slice(-4)}`;
        const product: Product = {
            id, name, category: String(form.get('category')), price: Number(form.get('price')),
            originalPrice: Number(form.get('originalPrice')) || undefined, rating: initial?.rating ?? 5,
            reviews: initial?.reviews ?? 0, sold: initial?.sold ?? 0, store: "Alex's Store", storeId: 'my-store',
            location: String(form.get('location')) || 'Davao City', country: 'Philippines', scope: 'local',
            image: imageText || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
            description: String(form.get('description')), stock: Number(form.get('stock')),
            tags: String(form.get('tags')).split(',').map((tag) => tag.trim()).filter(Boolean),
        };
        onSave(product);
        notify(initial ? 'Product updated' : 'Your product is ready.');
    };
    return <div className="product-editor"><div className="editor-heading"><div><span className="eyebrow">{initial ? 'EDIT LISTING' : 'NEW LISTING'}</span><h2>{initial ? 'Edit product' : 'Add a product'}</h2></div><button className="icon-button" aria-label="Close form" onClick={onCancel}><X size={20} /></button></div>
        <form onSubmit={submit}><div className="editor-fields"><label className="field-label field-full">Product name<input name="name" required defaultValue={initial?.name} placeholder="e.g. Hand-poured soy candle" /></label>
            <label className="field-label field-full">Description<textarea name="description" required rows={4} defaultValue={initial?.description} placeholder="What makes this product worth sharing?" /></label>
            <label className="field-label">Category<select name="category" defaultValue={initial?.category ?? 'Accessories'}>{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="field-label">Location<input name="location" defaultValue={initial?.location ?? 'Davao City'} placeholder="Your city" /></label>
            <label className="field-label">Price (₱)<input name="price" required type="number" min="1" step="1" defaultValue={initial?.price} placeholder="1290" /></label>
            <label className="field-label">Original price (₱)<input name="originalPrice" type="number" min="0" step="1" defaultValue={initial?.originalPrice} placeholder="Optional" /></label>
            <label className="field-label">Stock<input name="stock" required type="number" min="0" defaultValue={initial?.stock ?? 1} /></label>
            <label className="field-label field-full">Tags <small>Separate with commas</small><input name="tags" defaultValue={initial?.tags.join(', ')} placeholder="handmade, home, local" /></label>
            <label className="field-label field-full">Product image<input name="imageFile" type="file" accept="image/*" onChange={onImage} /><span className="input-hint">Choose an image from this device, or use an image URL below.</span></label>
            <label className="field-label field-full">Image URL<input value={imageText.startsWith('data:') ? '' : imageText} onChange={(event) => { setImageText(event.target.value); setPreview(event.target.value); }} placeholder="https://..." /></label>
            {preview && <div className="editor-image-preview"><img src={preview} alt="Product image preview" onError={() => setPreview('')} /><span>IMAGE PREVIEW</span></div>}
        </div><div className="editor-actions"><button type="button" className="button button-quiet" onClick={onCancel}>Cancel</button><button type="submit" className="button button-primary">{initial ? 'Save changes' : 'Create product'} <ArrowRight size={16} /></button></div></form>
    </div>;
}

export function SellerProductsPage() {
    const { products, saveProduct, deleteProduct, notify } = useDemo();
    const [searchParams, setSearchParams] = useSearchParams();
    const [editing, setEditing] = useState<Product | null>(null);
    const [creating, setCreating] = useState(searchParams.get('new') === '1');
    const [query, setQuery] = useState('');
    const [confirmDelete, setConfirmDelete] = useState('');
    const mine = products.filter((product) => product.storeId === 'my-store' && product.name.toLowerCase().includes(query.toLowerCase()));
    useEffect(() => { if (searchParams.get('new') === '1') setCreating(true); }, [searchParams]);
    const closeEditor = () => { setCreating(false); setEditing(null); if (searchParams.has('new')) setSearchParams({}); };
    const save = (product: Product) => { saveProduct(product); closeEditor(); };
    return <SellerFrame current="Products"><div className="seller-page-heading"><div><span className="eyebrow">YOUR CATALOG</span><h1>Products</h1><p>Manage listings, prices, and stock for your cLink store.</p></div><button className="button button-primary" onClick={() => setCreating(true)}><Plus size={16} /> Add product</button></div>
        <div className="seller-demo-banner"><span><Package size={17} /> {mine.length} ACTIVE LISTINGS</span><p>Product changes are stored in this browser and won’t publish to a real store.</p></div>
        {(creating || editing) && <ProductEditor key={editing?.id ?? 'new-product'} initial={editing ?? undefined} onSave={save} onCancel={closeEditor} />}
        <section className="seller-panel inventory-panel"><div className="inventory-toolbar"><label className="seller-table-search"><Search size={16} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a product" /></label><span>{mine.length} products</span><button className="button button-outline button-small" onClick={() => notify('Inventory is up to date in this demo')}><SlidersHorizontal size={15} /> Inventory</button></div>
            {mine.length ? <div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>PRODUCT</th><th>PRICE</th><th>STOCK</th><th>STATUS</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{mine.map((product) => <tr key={product.id}><td><div className="inventory-product"><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.category} · {product.sold} sold</small></span></div></td><td>{money(product.price)}</td><td>{product.stock} units</td><td><span className="inventory-active"><i /> Active</span></td><td><div className="table-actions"><button aria-label={`Copy cLink for ${product.name}`} title="Copy cLink" onClick={async () => { try { await navigator.clipboard.writeText(productLink(product.id)); } catch { /* Clipboard may be unavailable. */ } notify('cLink copied!'); }}><Copy size={15} /></button><button aria-label={`Edit ${product.name}`} title="Edit" onClick={() => { setEditing(product); setCreating(false); }}><Settings2 size={15} /></button><button aria-label={`Delete ${product.name}`} title="Delete" onClick={() => setConfirmDelete(product.id)}><Trash2 size={15} /></button></div>{confirmDelete === product.id && <div className="delete-confirm"><span>Delete this listing?</span><button onClick={() => { deleteProduct(product.id); setConfirmDelete(''); }}>Delete</button><button onClick={() => setConfirmDelete('')}>Cancel</button></div>}</td></tr>)}</tbody></table></div> : <div className="seller-empty"><Package size={24} /><h3>{query ? 'No matching products' : 'Your first product starts here.'}</h3><p>{query ? 'Try a different product name.' : 'Add a product, then share its cLink with the world.'}</p>{!query && <button className="button button-primary" onClick={() => setCreating(true)}><Plus size={16} /> Add your first product</button>}</div>}
        </section>
    </SellerFrame>;
}

export function SellerOrdersPage() {
    const { orders, notify } = useDemo();
    const tabs = ['All', 'Preparing', 'In Transit', 'Delivered', 'Cancelled'];
    const [active, setActive] = useState('All');
    const filtered = active === 'All' ? orders : orders.filter((order) => order.status === active);
    return <SellerFrame current="Orders"><div className="seller-page-heading"><div><span className="eyebrow">ORDER MANAGEMENT</span><h1>Orders</h1><p>Track incoming demo orders from your cLink storefront.</p></div><span className="seller-demo-chip">SIMULATED ORDERS</span></div><div className="seller-demo-banner"><span><ShoppingBag size={17} /> NO REAL PURCHASES</span><p>These illustrative orders are saved only in this browser.</p></div>
        <div className="status-tabs seller-status-tabs">{tabs.map((tab) => <button key={tab} aria-pressed={active === tab} className={active === tab ? 'active' : ''} onClick={() => setActive(tab)}>{tab}<span>{tab === 'All' ? orders.length : orders.filter((order) => order.status === tab).length}</span></button>)}</div><section className="seller-panel seller-order-table"><div className="inventory-table-wrap"><table className="inventory-table"><thead><tr><th>ORDER</th><th>DATE</th><th>ITEMS</th><th>TOTAL</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{filtered.map((order) => <tr key={order.id}><td><strong>{order.id}</strong></td><td>{order.date}</td><td>{order.items}</td><td>{money(order.total)}</td><td><span className={`status-badge status-${order.status.toLowerCase().replace(' ', '-')}`}>{order.status}</span></td><td><button className="text-link" onClick={() => notify(`${order.id}: ${order.items} · ${order.status}`)}>Details <ArrowRight size={14} /></button></td></tr>)}</tbody></table></div></section>
    </SellerFrame>;
}

export function SellerSalesPage() {
    const { products, orders } = useDemo();
    return <SellerFrame current="Sales"><div className="seller-page-heading"><div><span className="eyebrow">STORE PERFORMANCE</span><h1>Sales</h1><p>Illustrative numbers to show how seller insights could work.</p></div><select defaultValue="Last 30 days"><option>Last 7 days</option><option>Last 30 days</option><option>Last 12 months</option></select></div><div className="seller-demo-banner"><span><BarChart3 size={17} /> SIMULATED REVENUE ONLY</span><p>Figures are made up for this demo and do not represent real sales, orders, or visitors.</p></div><div className="sales-summary-cards"><article><span>SIMULATED REVENUE</span><strong>₱48,650</strong><small>+12.8% vs previous period</small></article><article><span>DEMO ORDERS</span><strong>{orders.length}</strong><small>Across all statuses</small></article><article><span>CONVERSION RATE</span><strong>3.6%</strong><small>Illustrative store activity</small></article><article><span>SHARE CLICKS</span><strong>347</strong><small>Example cLink engagement</small></article></div><section className="seller-panel performance-panel"><div className="seller-panel-heading"><div><span className="eyebrow">PRODUCT PERFORMANCE</span><h2>What people are finding</h2></div></div><div className="performance-list">{products.filter((product) => product.storeId === 'my-store').length ? products.filter((product) => product.storeId === 'my-store').map((product) => <div key={product.id}><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>{product.sold} demo sales · {product.reviews} reviews</small></span><strong>{money(product.price * product.sold)}</strong><span className="performance-up">+8.4%</span></div>) : <div className="seller-empty"><Package size={22} /><h3>Product insights start with a listing.</h3><p>Add a product to see an example of its performance here.</p><Link to="/seller/products?new=1" className="button button-outline">Add a product</Link></div>}</div></section>
    </SellerFrame>;
}

export function SellerStorePage() {
    const { notify } = useDemo();
    const [storeName, setStoreName] = useState(() => localStorage.getItem('clink-store-name') ?? "Alex's Store");
    const [location, setLocation] = useState(() => localStorage.getItem('clink-store-location') ?? 'Davao City');
    const [description, setDescription] = useState(() => localStorage.getItem('clink-store-description') ?? 'Thoughtful finds and useful things from Davao. A small independent store, ready to share.');
    const [image, setImage] = useState(() => localStorage.getItem('clink-store-image') ?? 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85');
    const save = (event: FormEvent) => { event.preventDefault(); localStorage.setItem('clink-store-name', storeName); localStorage.setItem('clink-store-location', location); localStorage.setItem('clink-store-description', description); localStorage.setItem('clink-store-image', image); notify('Store details saved in this browser'); };
    return <SellerFrame current="Store"><div className="seller-page-heading"><div><span className="eyebrow">YOUR PUBLIC STOREFRONT</span><h1>Store</h1><p>Shape the page your customers see when they open your store cLink.</p></div><Link to="/store/my-store" className="button button-outline">View store <ArrowRight size={15} /></Link></div><div className="seller-demo-banner"><span><StoreIcon size={17} /> STOREFRONT PREVIEW</span><p>Changes are saved locally for this prototype.</p></div>
        <div className="store-editor-layout"><form className="seller-panel store-edit-form" onSubmit={save}><span className="eyebrow">STORE PROFILE</span><h2>A little about your store</h2><label className="field-label">Store name<input required value={storeName} onChange={(event) => setStoreName(event.target.value)} /></label><label className="field-label">Store description<textarea required rows={4} value={description} onChange={(event) => setDescription(event.target.value)} /></label><label className="field-label">Location<input required value={location} onChange={(event) => setLocation(event.target.value)} /></label><label className="field-label">Store image URL<input value={image} onChange={(event) => setImage(event.target.value)} /></label><button className="button button-primary" type="submit">Save store details <Check size={16} /></button></form><div className="store-preview"><span className="eyebrow">LIVE PREVIEW</span><div className="store-preview-window"><img src={image} alt="Store cover preview" /><div><span className="store-avatar">{storeName.slice(0, 1)}</span><h3>{storeName}</h3><p><MapPin size={13} /> {location}</p><p>{description}</p><span className="preview-link">clink.local/store/my-store</span></div></div><CopyButton value="https://clink.local/store/my-store" label="Copy store cLink" /></div></div>
    </SellerFrame>;
}
