"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, Sparkles, Droplets, Shield } from "lucide-react"

const services = [
   {
      name: "Lavado Básico",
      price: "$25",
      features: ["Lavado exterior completo", "Secado profesional", "Limpieza de llantas", "Aspirado interior básico"],
      icon: Droplets,
   },
   {
      name: "Lavado Premium",
      price: "$45",
      features: [
         "Todo del lavado básico",
         "Limpieza profunda interior",
         "Pulido de carrocería",
         "Tratamiento de plásticos",
         "Perfumado especial",
      ],
      icon: Sparkles,
      popular: true,
   },
   {
      name: "Detailing Completo",
      price: "$120",
      features: [
         "Todo del lavado premium",
         "Encerado profesional",
         "Pulido de faros",
         "Limpieza de motor",
         "Protección cerámica",
         "Garantía de 30 días",
      ],
      icon: Shield,
   },
]

export function WashSection() {
   return (
      <section id="wash" className="py-24 bg-background">
         <div className="container mx-auto px-4">
            <motion.div
               className="text-center mb-16"
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
               <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">
                  Servicio de Lavado Premium
               </h2>
               <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Cuidamos tu vehículo con la máxima dedicación y productos de primera calidad
               </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
               {services.map((service, index) => {
                  const Icon = service.icon
                  return (
                     <motion.div
                        key={service.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                     >
                        <Card
                           className={`relative p-8 h-full flex flex-col ${service.popular ? "bg-accent/5 border-accent" : "bg-card border-border"
                              }`}
                        >
                           {service.popular && (
                              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                 <span className="px-4 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                                    Más Popular
                                 </span>
                              </div>
                           )}

                           <div className="mb-6">
                              <div className="inline-flex p-3 rounded-lg bg-accent/10 mb-4">
                                 <Icon className="h-8 w-8 text-accent" />
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-2">{service.name}</h3>
                              <div className="flex items-baseline gap-1">
                                 <span className="text-4xl font-bold text-accent">{service.price}</span>
                                 <span className="text-muted-foreground">/servicio</span>
                              </div>
                           </div>

                           <ul className="space-y-3 mb-8 flex-grow">
                              {service.features.map((feature) => (
                                 <li key={feature} className="flex items-start gap-3">
                                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{feature}</span>
                                 </li>
                              ))}
                           </ul>

                           <Button className="w-full" variant={service.popular ? "default" : "outline"}>
                              Reservar Turno
                           </Button>
                        </Card>
                     </motion.div>
                  )
               })}
            </div>

            <motion.div
               className="mt-16 text-center"
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.3 }}
            >
               <Card className="inline-block p-8 bg-card border-border">
                  <p className="text-muted-foreground mb-4">¿Necesitas un servicio personalizado?</p>
                  <Button variant="outline">Contactar para Cotización</Button>
               </Card>
            </motion.div>
         </div>
      </section>
   )
}
