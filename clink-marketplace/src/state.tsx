import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { demoOrders, products as seedProducts, type Product } from './data';

type CartLine = { productId: string; quantity: number };
type DemoOrder = { id: string; date: string; status: string; items: string; total: number; store: string };
type DemoState = {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    favorites: string[];
    toggleFavorite: (id: string) => void;
    cart: CartLine[];
    addToCart: (id: string, quantity?: number) => void;
    setQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    products: Product[];
    saveProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    orders: DemoOrder[];
    placeOrder: () => DemoOrder;
    toast: string;
    notify: (message: string) => void;
    settings: Record<string, boolean>;
    setSetting: (key: string, value: boolean) => void;
    selectedPlan: string;
    selectPlan: (name: string) => void;
};

const DemoContext = createContext<DemoState | null>(null);

function useStoredState<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(`clink-${key}`);
            return saved ? JSON.parse(saved) as T : initial;
        } catch {
            return initial;
        }
    });
    useEffect(() => {
        localStorage.setItem(`clink-${key}`, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue] as const;
}

export function DemoProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useStoredState<'light' | 'dark'>('theme', 'light');
    const [favorites, setFavorites] = useStoredState<string[]>('favorites', ['woven-basket']);
    const [cart, setCart] = useStoredState<CartLine[]>('cart', []);
    const [products, setProducts] = useStoredState<Product[]>('products', seedProducts);
    const [orders, setOrders] = useStoredState<DemoOrder[]>('orders', demoOrders);
    const [settings, setSettings] = useStoredState<Record<string, boolean>>('settings', {
        orderNotifications: true, sellerNotifications: true, marketingNotifications: false,
        accountVisibility: true, dataPreferences: true,
    });
    const [selectedPlan, setSelectedPlan] = useStoredState('plan', '');
    const [toast, setToast] = useState('');

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);
    useEffect(() => {
        if (!toast) return;
        const timer = window.setTimeout(() => setToast(''), 2600);
        return () => window.clearTimeout(timer);
    }, [toast]);

    const notify = (message: string) => setToast(message);
    const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]);
    const addToCart = (id: string, quantity = 1) => {
        setCart((current) => {
            const existing = current.find((line) => line.productId === id);
            return existing
                ? current.map((line) => line.productId === id ? { ...line, quantity: line.quantity + quantity } : line)
                : [...current, { productId: id, quantity }];
        });
        setToast('Added to your cart');
    };
    const setQuantity = (id: string, quantity: number) => setCart((current) => current.map((line) =>
        line.productId === id ? { ...line, quantity: Math.max(1, quantity) } : line));
    const removeFromCart = (id: string) => setCart((current) => current.filter((line) => line.productId !== id));
    const saveProduct = (product: Product) => setProducts((current) => {
        const exists = current.some((item) => item.id === product.id);
        return exists ? current.map((item) => item.id === product.id ? product : item) : [product, ...current];
    });
    const deleteProduct = (id: string) => setProducts((current) => current.filter((item) => item.id !== id));
    const placeOrder = () => {
        const order: DemoOrder = {
            id: `CL-2026-${1042 + orders.length - demoOrders.length}`,
            date: new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date()),
            status: 'Preparing',
            items: cart.map((line) => `${line.quantity} × ${products.find((item) => item.id === line.productId)?.name ?? 'Product'}`).join(', '),
            total: cart.reduce((sum, line) => sum + (products.find((item) => item.id === line.productId)?.price ?? 0) * line.quantity, 0) + 85,
            store: 'cLink sellers',
        };
        setOrders((current) => [order, ...current]);
        setCart([]);
        return order;
    };

    return <DemoContext.Provider value={{
        theme, setTheme, favorites, toggleFavorite, cart, addToCart, setQuantity, removeFromCart,
        products, saveProduct, deleteProduct, orders, placeOrder, toast, notify, settings,
        setSetting: (key, value) => setSettings((current) => ({ ...current, [key]: value })),
        selectedPlan, selectPlan: setSelectedPlan,
    }}>{children}</DemoContext.Provider>;
}

export function useDemo() {
    const context = useContext(DemoContext);
    if (!context) throw new Error('useDemo must be used inside DemoProvider');
    return context;
}
