const e="Produkter",t="Recept",r="Konto",a="Logga in",n="Logga ut",o="Varukorg",s="Admin",i="Endast :quantity kvar i lager!",d="produkt",l="Sida :current_page av :last_page",c="Skapad: :date",u="Ingredienser: :ingredients",g="recept",k="Sök",p="Ingredienser",m="Instruktioner",h="g",v="kg",f="ml",y="l",b="tsk",A="msk",w="kopp",S="stycke",P="Titel",I="Beskrivning",R="Lägg till",O="Välkommen tillbaka, :name!",D="Användarnamn",C="E-post",_="Spara",N="Lösenord",T="Avbryt",L="Order #:number",B="Totalt",E="Status",H="Artiklar",U="Pris",V="Kassa",j="Adress",x="Betalning",K="Betala",M="De visade priserna baseras på :currency och beräknas med dagens växelkurs. Vänligen notera att det kan uppstå små avvikelser vid betalningstillfället.",Y="Varning",q="När du ändrar valuta kommer den valda valutan att bli referensvalutan som tillämpas vid kassan. Dessutom kommer priserna på produkter som visas i butiken att direkt återspegla det belopp som är inställt i den valda valutan. Till exempel, om det aktuella priset på en produkt är inställt på 100 svenska kronor, kommer priset på produkten att visas som 100 USD när valutan ändras till amerikanska dollar. Vi rekommenderar att du justerar produktpriserna vid behov innan du ändrar valutan.",W="Registrera",F="Bekräfta",G="Åtgärder",J="Uppdatera",Q="order",z="Orderdetaljer - #:id",X="Antal",Z="Redigera Order - #:id",$="Avvaktar",ee="Bekräftar",te="Bearbetar",re="Slutförd",ae="Avbruten",ne="Redigera",oe="Radera",se="Redigera Användare - :username",ie="Roll",de="Administratör",le="Kund",ce="användare",ue="Användardetaljer - :username",ge="Ljus",ke="Mörk",pe={Products:e,Recipes:t,"Create account":"Skapa konto",Account:r,Login:a,Logout:n,Cart:o,Admin:s,"You have been logged out!":"Du har loggats ut!","Featured Recipes":"Utvalda Recept","All Recipes":"Alla Recept","Latest Products":"Senaste Produkter","All Products":"Alla Produkter","Our Products":"Våra Produkter","Out of stock":"Ej i lager",low_stock:i,"In stock":"I lager","Add to Cart":"Lägg i varukorg",product:d,"&laquo; Previous":"&laquo; Föregående","Next &raquo;":"Nästa &raquo;",pagination:l,"No Image Available":"Ingen bild tillgänglig","Back to Products":"Tillbaka till Produkter","Create a New Recipe":"Skapa ett nytt recept","Search Results for":"Sökresultat för",created_at:c,ingredients:u,"No recipes found for the selected ingredients.":"Inga recept hittades för de valda ingredienserna.",recipe:g,"Search recipes by ingredients":"Sök recept efter ingredienser","Store products":"Butikens produkter","Other ingredients":"Övriga ingredienser",Search:k,"Back to Recipes":"Tillbaka till Recept",Ingredients:p,"No ingredients available.":"Inga ingredienser tillgängliga.",Instructions:m,"Loading...":"Laddar...",g:h,kg:v,ml:f,l:y,tsp:b,tbsp:A,cup:w,piece:S,Title:P,Description:I,"Recipe Image":"Receptbild","Select from shop ingredients":"Välj från butikens ingredienser","Add custom ingredient":"Lägg till anpassad ingrediens","Select unit":"Välj enhet","Custom ingredient name":"Anpassat ingrediensnamn",Add:R,"Add step":"Lägg till steg","Submit Recipe":"Skicka Recept",welcome_back:O,"Account Settings":"Kontoinställningar","Manage your account settings and profile.":"Hantera dina kontoinställningar och profil.","Go to Account Settings":"Gå till Kontoinställningar","Order History":"Orderhistorik","View your past orders and details.":"Visa dina tidigare beställningar och detaljer.","View Order History":"Visa Orderhistorik","Back to Dashboard":"Tillbaka till Dashboard","Profile Information":"Profilinformation","Update your account's profile information and email address.":"Uppdatera ditt kontos profilinformation och e-postadress.",username:D,Email:C,"Your email address is unverified.":"Din e-postadress är inte verifierad.","Click here to re-send the verification email.":"Klicka här för att skicka e-postbekräftelsen igen.","A new verification link has been sent to your email address.":"En ny verifieringslänk har skickats till din e-postadress.",Save:_,"Saved.":"Sparad.","Update Password":"Uppdatera lösenord","Ensure your account is using a long, random password to stay secure.":"Se till att ditt konto använder ett långt, slumpmässigt lösenord för att vara säkert.","Current Password":"Nuvarande lösenord","New Password":"Nytt lösenord","Confirm Password":"Bekräfta lösenord","Delete Account":"Radera konto","Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.":"När ditt konto är raderat kommer alla dess resurser och data att raderas permanent. Innan du raderar ditt konto, ladda ner eventuella data eller information som du vill behålla.","Are you sure you want to delete your account?":"Är du säker på att du vill radera ditt konto?","Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.":"När ditt konto är raderat kommer alla dess resurser och data att raderas permanent. Ange ditt lösenord för att bekräfta att du vill radera ditt konto permanent.",Password:N,Cancel:T,"No orders found.":"Inga ordrar hittades.",order_number:L,Total:B,Status:E,Items:H,"Your Cart":"Din Varukorg",Price:U,Checkout:V,"Your cart is empty":"Din varukorg är tom",Address:j,Payment:x,Pay:K,"Order Confirmation":"Orderbekräftelse","Thank you for your order!":"Tack för din beställning!","Your order ID":"Ditt order-ID","Order Summary":"Order Sammanfattning","We will send you an email confirmation shortly with more details.":"Vi skickar dig snart en e-postbekräftelse med fler detaljer.","Back to Home":"Tillbaka till Startsida","About displayed prices":"Om visade priser",price_warning:M,"Swedish Krona":"Svenska Kronor","US Dollar":"Amerikanska Dollar","Japanese Yen":"Japanska Yen",Warning:Y,currency_warning_message:q,"Already registered?":"Redan registrerad?",Register:W,"Remember me":"Kom ihåg mig","Forgot your password?":"Glömt ditt lösenord?","This is a secure area of the application. Please confirm your password before continuing.":"Detta är ett säkert område i applikationen. Bekräfta ditt lösenord innan du fortsätter.",Confirm:F,"Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.":"Glömt ditt lösenord? Inga problem. Låt oss bara veta din e-postadress så skickar vi dig en länk för att återställa lösenordet som låter dig välja ett nytt.","Email Password Reset Link":"E-posta lösenordsåterställningslänk","Reset Password":"Återställ lösenord","Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.":"Tack för att du registrerade dig! Innan du börjar, kan du verifiera din e-postadress genom att klicka på länken vi precis skickade till dig? Om du inte har fått e-posten skickar vi gärna en till.","A new verification link has been sent to the email address you provided during registration.":"En ny verifieringslänk har skickats till e-postadressen du angav vid registrering.","Resend Verification Email":"Skicka verifierings-e-post igen","Welcome back!":"Välkommen tillbaka!","Admin Dashboard":"Adminpanel","Welcome to the admin dashboard. Here you can manage your shop.":"Välkommen till adminpanelen. Här kan du hantera din butik.","Manage Products":"Hantera Produkter","Manage Orders":"Hantera Ordrar","Manage Users":"Hantera Användare","Manage Shop Settings":"Hantera Butikens Inställningar","Order Management":"Orderhantering","Order ID":"Order-ID","User ID":"Användar-ID","Total Price":"Totalpris","Created At":"Skapad",Actions:G,Update:J,order:Q,order_details:z,"Customer Name":"Kundnamn","Customer Email":"Kundens E-post","Order Status":"Orderstatus","Updated At":"Uppdaterad","Order Items":"Orderartiklar","Product Name":"Produktnamn",Quantity:X,"Unit Price":"Enhetspris","Back to Orders":"Tillbaka till Ordrar",edit_order:Z,pending:$,confirmed:ee,processing:te,completed:re,cancelled:ae,"Save Changes":"Spara Ändringar","Create a New Product":"Skapa en Ny Produkt","Stock Quantity":"Lagerkvantitet","Product Image":"Produktbild","Save Product":"Spara Produkt","Edit Product":"Redigera Produkt","Saving...":"Sparar...","Product Management":"Produkthantering","Add New Product":"Lägg till Ny Produkt",Edit:ne,Delete:oe,"Shop currency":"Butikens valuta","Current currency":"Aktuell valuta",edit_user:se,Role:ie,Administrator:de,Customer:le,"Back to Users":"Tillbaka till Användare","User Management":"Användarhantering",user:ce,user_details:ue,"Edit Hero":"Redigera Hero","Hero text":"Hero text","Text color":"Textfärg",Light:ge,Dark:ke,"Hero image":"Hero bild","No recipes available":"Inga recept tillgängliga","No products available":"Inga produkter tillgängliga","Don't have an account?":"Har du inget konto?","A hero is a key visual element on the homepage, designed to grab attention and highlight important content or actions. It usually includes a catchy tagline and an image that represents the theme of the website.":"En hero är ett nyckelvisuellt element på startsidan, utformat för att dra uppmärksamhet och framhäva viktig innehåll eller åtgärder. Det inkluderar vanligtvis en fångande tagline och en bild som representerar webbplatsens tema.","In this section, you can update the hero text, image, and text color to better match the theme of your site.":"I detta avsnitt kan du uppdatera hero text, bild och textfärg för att bättre matcha din webbplats tema."};export{r as Account,G as Actions,R as Add,j as Address,s as Admin,de as Administrator,T as Cancel,o as Cart,V as Checkout,F as Confirm,le as Customer,ke as Dark,oe as Delete,I as Description,ne as Edit,C as Email,p as Ingredients,m as Instructions,H as Items,ge as Light,a as Login,n as Logout,N as Password,K as Pay,x as Payment,U as Price,e as Products,X as Quantity,t as Recipes,W as Register,ie as Role,_ as Save,k as Search,E as Status,P as Title,B as Total,J as Update,Y as Warning,ae as cancelled,re as completed,ee as confirmed,c as created_at,w as cup,q as currency_warning_message,pe as default,Z as edit_order,se as edit_user,h as g,u as ingredients,v as kg,y as l,i as low_stock,f as ml,Q as order,z as order_details,L as order_number,l as pagination,$ as pending,S as piece,M as price_warning,te as processing,d as product,g as recipe,A as tbsp,b as tsp,ce as user,ue as user_details,D as username,O as welcome_back};
