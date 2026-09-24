/* ==========================================================================
   PRODUCTS.JS

   Aqui ficam TODOS os produtos do site.

   Para adicionar um produto novo:
   1. Copie um objeto inteiro
   2. Cole no final da lista, antes do ];
   3. Troque os valores
   4. Salve o arquivo
   ========================================================================== */

   const CATEGORIES = [
    { id: "casa", label: "Casa", emoji: "🏠" },
    { id: "ferramentas", label: "Ferramentas", emoji: "🔧" },
    { id: "tecnologia", label: "Tecnologia", emoji: "📱" },
    { id: "eletronicos", label: "Eletrônicos", emoji: "🎧" },
    { id: "cozinha", label: "Cozinha", emoji: "🍳" },
    { id: "casa-inteligente", label: "Casa Inteligente", emoji: "💡" },
    { id: "games", label: "Games", emoji: "🎮" },
    { id: "beleza", label: "Beleza", emoji: "💄" },
    { id: "automotivo", label: "Automotivo", emoji: "🚗" },
    { id: "moda", label: "Moda", emoji: "👕" },
  ];
  
  const products = [
  
    {
      id: 1,
      name: "Tomada Inteligente Smart Wifi Controle Automação Ekaza 16A",
      category: "casa-inteligente",
  
      image: "https://http2.mlstatic.com/D_Q_NP_953374-MLA96319906125_102025-F.webp",
  
      oldPrice: 58.90,
      price: 45.12,
      discount: 23,
  
      rating: 4.9,
      reviews: 8739,
  
      sold: "+50 mil vendidos",
  
      description:
        "Tomada inteligente de 16A com controle pelo celular, monitoramento de energia, Alexa e Google Assistant e programação de horários.",
  
      affiliateLink: "https://www.mercadolivre.com.br/tomada-inteligente-smart-wifi-controle-automacao-ekaza-16a/p/MLB26871336?matt_event_ts=1790262790107&matt_d2id=5c77c0bd-5529-4704-a435-e511d1bf64e0&matt_tracing_id=ae9e1653-8a4b-4cf5-a461-0068befbf728#polycard_client=recommendations_home_affiliate-profile&reco_backend=item_decorator&reco_client=home_affiliate-profile&matt_tool_id=52780588&reco_item_pos=0&source=affiliate-profile&reco_backend_type=function&reco_id=782ed04b-6c5f-4c72-9d4b-21fcab120ea1&tracking_id=15b7ceb4-9912-4756-a91f-5853791bde8b&c_id=/home/card-featured/element&c_uid=feffa52e-bde6-465c-aac0-46c157eb000cO",
  
      featured: true
    },
    {
      id: 2,
      name: "Tomada Inteligente Wi-Fi 16A Bivolt Qonex Smart Plug",
      category: "casa-inteligente",
    
      image: "https://http2.mlstatic.com/D_NQ_NP_2X_709426-MLA115448586876_082026-F.webp",
    
      oldPrice: 63.90,
      price: 36.90,
      discount: 42,
    
      rating: 4.9,
      reviews: 101,
      sold: "+1000 vendidos",
    
      description:
        "Tomada inteligente Wi-Fi 16A bivolt com controle pelo celular, monitoramento de consumo de energia e compatibilidade com Alexa e Google Home.",
    
      affiliateLink: "https://www.mercadolivre.com.br/tomada-inteligente-wi-fi-16a-bivolt-qonex-automacao-smart-plug-interruptor-com-monitor-de-consumo-compativel-alexa-e-google-home/p/MLB76578448?matt_event_ts=1790262862360&matt_d2id=5c77c0bd-5529-4704-a435-e511d1bf64e0&matt_tracing_id=10253fd8-e079-4d63-a64b-10793dae0518#polycard_client=recommendations_home_affiliate-profile&reco_backend=item_decorator&reco_client=home_affiliate-profile&matt_tool_id=52780588&reco_item_pos=0&source=affiliate-profile&reco_backend_type=function&reco_id=9d576c8e-efc4-41f5-a7a4-c0c72823232f&tracking_id=2c936b1f-9b62-48a1-9665-793592cdbf36&c_id=/home/card-featured/element&c_uid=1a8c6b8f-9111-4249-9691-163c2cc58ef6",
    
      featured: true
    }
  
  ];