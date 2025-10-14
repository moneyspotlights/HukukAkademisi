import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Trash2, ShoppingCart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const CartPage = ({ cart, removeFromCart, navigateTo }) => {
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    const handleCheckout = () => {
        toast({
            title: '🚧 Ödeme işlemi henüz aktif değil',
            description: 'Bu özellik yakında eklenecektir. Anlayışınız için teşekkürler!',
        });
    };
    
    return (
        <>
            <Helmet>
                <title>Sepetim - Hukuk Akademisi</title>
                <meta name="description" content="Alışveriş sepetinizi görüntüleyin ve ödeme yapın." />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Sepetim</h1>
                    <p className="text-lg text-muted-foreground">Siparişinizi tamamlamaya hazırsınız.</p>
                </motion.div>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item, index) => (
                                <motion.div
                                    key={`${item.id}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-card border rounded-2xl p-4 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-primary">{item.type}</p>
                                        <h3 className="font-semibold">{item.title}</h3>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <p className="font-bold">₺{item.price}</p>
                                        <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive rounded-full">
                                            <Trash2 className="h-5 w-5"/>
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="lg:col-span-1">
                             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="sticky top-24 bg-card border rounded-2xl p-6 shadow-lg">
                                <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Ara Toplam</span>
                                        <span>₺{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Toplam</span>
                                        <span>₺{totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button onClick={handleCheckout} size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg py-6">
                                    Ödemeye Geç
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-card border rounded-2xl">
                        <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4"/>
                        <h2 className="text-2xl font-bold mb-2">Sepetiniz boş</h2>
                        <p className="text-muted-foreground mb-6">Hemen alışverişe başlayın!</p>
                        <Button onClick={() => navigateTo('home')} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                            Alışverişe Başla
                        </Button>
                    </motion.div>
                )}
            </div>
        </>
    );
};

export default CartPage;