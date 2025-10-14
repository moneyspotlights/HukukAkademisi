import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ShoppingCart, Package } from 'lucide-react';

const PublicationDetailPage = ({ publicationId, navigateTo, addToCart }) => {
    const [publication, setPublication] = useState(null);

    useEffect(() => {
        const savedPublications = localStorage.getItem('publications');
        if (savedPublications) {
            const found = JSON.parse(savedPublications).find(p => p.id === publicationId);
            setPublication(found);
        }
    }, [publicationId]);

    const handleAddToCart = () => {
        addToCart({ ...publication, type: publication.type === 'kitap' ? 'Kitap' : 'Dergi' });
        toast({
            title: 'Sepete Eklendi! 🛒',
            description: `${publication.title} sepetinize eklendi.`,
        });
        navigateTo('cart');
    };

    if (!publication) {
        return <div className="text-center py-24">Yayın bulunamadı.</div>;
    }

    return (
        <>
            <Helmet>
                <title>{publication.title} - Hukuk Akademisi</title>
                <meta name="description" content={`${publication.title} yayını hakkında detaylı bilgi.`} />
            </Helmet>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button variant="ghost" onClick={() => navigateTo('publications')} className="mb-6">← Geri Dön</Button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="aspect-[3/4] bg-card border rounded-2xl overflow-hidden shadow-lg">
                        <img className="w-full h-full object-cover" alt={publication.title} src="https://images.unsplash.com/photo-1679250159914-8983fd56dc9f" />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                        <span className="text-sm font-semibold text-primary uppercase">{publication.type}</span>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold my-4">{publication.title}</h1>
                        <p className="text-4xl font-bold text-primary mb-6">₺{publication.price}</p>
                        <p className="text-muted-foreground mb-8">Bu yayın hakkında detaylı açıklama metni buraya eklenecektir. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        
                        <div className="flex items-center gap-4 mb-8">
                             <Package className="h-5 w-5 text-muted-foreground"/>
                             <span className="text-muted-foreground">Stok: <span className="font-bold text-foreground">{publication.stock}</span> adet</span>
                        </div>

                        <Button onClick={handleAddToCart} size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-lg px-8 py-6">
                            <ShoppingCart className="h-5 w-5 mr-3"/>
                            Sepete Ekle
                        </Button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default PublicationDetailPage;