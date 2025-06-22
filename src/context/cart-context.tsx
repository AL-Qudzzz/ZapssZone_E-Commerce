
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/placeholder-data';
import { useAuth } from './auth-context';
import { db } from '@/lib/firebase';
import { collection, doc, onSnapshot, writeBatch, getDocs, serverTimestamp, addDoc, setDoc, deleteDoc } from 'firebase/firestore';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  lastOrder: CartItem[];
  createOrder: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastOrder, setLastOrder] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const mergeCarts = useCallback(async (localCart: CartItem[], userId: string) => {
    if (localCart.length === 0) return;
    
    const cartRef = collection(db, 'users', userId, 'cart');
    const batch = writeBatch(db);

    localCart.forEach(item => {
        const docRef = doc(cartRef, item.id);
        batch.set(docRef, { ...item });
    });

    await batch.commit();
    localStorage.removeItem('cart');
  }, []);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const localCart = JSON.parse(localStorage.getItem('cart') || '[]');
      if (localCart.length > 0) {
        mergeCarts(localCart, user.uid).then(() => {
          // The onSnapshot will handle updating the state
        });
      }
      
      const cartRef = collection(db, 'users', user.uid, 'cart');
      const unsubscribe = onSnapshot(cartRef, (snapshot) => {
        const items: CartItem[] = [];
        snapshot.forEach((doc) => {
          items.push(doc.data() as CartItem);
        });
        setCartItems(items);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Handle guest cart from localStorage
      try {
        const savedCart = localStorage.getItem('cart');
        setCartItems(savedCart ? JSON.parse(savedCart) : []);
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        setCartItems([]);
      }
      setLoading(false);
    }
  }, [user, mergeCarts]);

  const addToCart = useCallback(async (product: Product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;
    const newItem: CartItem = { ...product, quantity: newQuantity };

    if (user) {
        const cartItemRef = doc(db, 'users', user.uid, 'cart', product.id);
        await setDoc(cartItemRef, newItem, { merge: true });
    } else {
        let updatedCart = [];
        if (existingItem) {
            updatedCart = cartItems.map(item => item.id === product.id ? newItem : item);
        } else {
            updatedCart = [...cartItems, newItem];
        }
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  }, [cartItems, user, toast]);

  const removeFromCart = useCallback(async (productId: string) => {
    if (user) {
        const cartItemRef = doc(db, 'users', user.uid, 'cart', productId);
        await deleteDoc(cartItemRef);
    } else {
        const updatedCart = cartItems.filter(item => item.id !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    toast({
      title: "Removed from cart",
      description: `Item has been removed from your cart.`,
      variant: 'destructive'
    });
  }, [cartItems, user, toast]);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (user) {
        const cartItemRef = doc(db, 'users', user.uid, 'cart', productId);
        await setDoc(cartItemRef, { quantity }, { merge: true });
    } else {
        const updatedCart = cartItems.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }, [cartItems, user, removeFromCart]);

  const clearCart = useCallback(async () => {
    if (user) {
        const cartRef = collection(db, 'users', user.uid, 'cart');
        const querySnapshot = await getDocs(cartRef);
        const batch = writeBatch(db);
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    } else {
        setCartItems([]);
        localStorage.removeItem('cart');
    }
  }, [user]);

  const createOrder = useCallback(async () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to be logged in to place an order.",
        variant: "destructive",
      });
      return;
    }
    if (cartItems.length === 0) return;

    setLastOrder(cartItems);
    localStorage.setItem('lastOrder', JSON.stringify(cartItems));

    const ordersRef = collection(db, 'orders');
    await addDoc(ordersRef, {
      userId: user.uid,
      items: cartItems,
      total: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      status: 'Pending',
      createdAt: serverTimestamp(),
    });
    
    await clearCart();

  }, [user, cartItems, clearCart, toast]);
  
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        lastOrder,
        createOrder,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
