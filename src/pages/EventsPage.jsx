import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Ticket, Video, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const EventsPage = ({ navigateTo }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const savedEvents = localStorage.getItem('events');
        setEvents(savedEvents ? JSON.parse(savedEvents) : []);
    }, []);
    
    const handleBuyTicket = (event) => {
        toast({
            title: `🚧 ${event.title}`,
            description: 'Bilet alım özelliği henüz uygulanmadı. Bir sonraki isteminizde talep edebilirsiniz!',
        });
    }

    const renderEventCard = (event) => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
        const formattedTime = eventDate.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

        return (
            <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2 text-sm text-primary font-semibold">
                        {event.type === 'Online' ? <Video className="h-4 w-4"/> : <Users className="h-4 w-4"/>}
                        <span>{event.type}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-2">
                           <Calendar className="h-4 w-4"/>
                           <span>{formattedDate} - {formattedTime}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-2">
                    <p className="text-2xl font-bold text-primary">₺{event.price}</p>
                    <Button onClick={() => handleBuyTicket(event)} className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                        <Ticket className="h-4 w-4 mr-2"/>
                        Bilet Al
                    </Button>
                </div>
            </motion.div>
        );
    };

    const onlineEvents = events.filter(e => e.type === 'Online');
    const offlineEvents = events.filter(e => e.type === 'Yüz Yüze');

    return (
        <>
            <Helmet>
                <title>Etkinlikler - Hukuk Akademisi</title>
                <meta name="description" content="Hukuk Akademisi tarafından düzenlenen online ve yüz yüze etkinlikler." />
            </Helmet>
            <div className="bg-gradient-to-b from-background to-muted/20 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">Etkinlikler</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Online ve yüz yüze etkinliklerimize katılarak kendinizi geliştirin.</p>
                    </motion.div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
                            <TabsTrigger value="all">Tümü</TabsTrigger>
                            <TabsTrigger value="online">Online</TabsTrigger>
                            <TabsTrigger value="offline">Yüz Yüze</TabsTrigger>
                        </TabsList>
                        <div className="space-y-6">
                            <TabsContent value="all">{events.map(renderEventCard)}</TabsContent>
                            <TabsContent value="online">{onlineEvents.map(renderEventCard)}</TabsContent>
                            <TabsContent value="offline">{offlineEvents.map(renderEventCard)}</TabsContent>
                        </div>
                        {events.length === 0 && <p className="text-center text-muted-foreground py-12">Yaklaşan etkinlik bulunmamaktadır.</p>}
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default EventsPage;