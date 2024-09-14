## Portfolio / Blog App

Projeyi [buraya](http://mfuygur.vercel.app) tıklayarak inceleyebilirsiniz.  

Bu proje 2 amaç doğrultusunda oluşturulmuştur:

1. İlk olarak kendimi tanıtmak
2. İkinci olarak hem yaptığım projeleri anlatmak hem de duygu ve düşüncelerimi paylaşabileceğim bir uygulama yapmak

## Genel Bilgiler

Proje bir React framework'ü olan Next.js ile geliştirilmiştir. 

Proje "Anasayfa", "Projeler", "Bloglar" ve "İletişim" sayfalarından oluşmaktadır. Geriye kalan giriş sayfası kullanıcılara gözükse bile sadece admin tarafıdan giriş yapılabilmektedir.

Veriler "Neurelo" yardımıyla "MongoDB" üzerinde depolanmıştır.

Yeni bir yazı veya proje eklenirken resimler Firebase Firestore ile depolanmıştır. Eklenen resme ait bir link oluşturularak tüm veriler MongoDB'de bulunan veritabanına kaydedilir. 

Metin editörü olarak "React Quill" kullanılmış, XSS saldırılarının önüne geçmek için "Sanitize HTML" ile de güvenli bir şekilde ekrana bastırılmıştır. 

Projeler ve Bloglar sayfalarında sayfa numarasını ve sayfa başına gösterilecek içerik sayısını tutabilmek için Zustand kullanılmıştır. 

NextAuth ile giriş ve çıkış işlemleri yapılmıştır. Yeni bir yazı veya proje eklemek için NextAuth tarafından oluşturulan veriler kullanılmıştır.

Styled Component yardımıyla React Quill ile oluşturulan metinler tasarım açısından optimize edilmiştir.

Eklenen her proje veya yazı düzenlenebilir ve silinebilir durumdadır. Ancak bu rol, sadece admin için geçerlidir. 

TailwindCss ile tamamıyla responsive olarak tasarlanan projede açık ve koyu mod bulunmaktadır.

Kullanıcıların mail atmaları için EmailJs kullanılmıştır.

Proje Vercel üzerinde deploy edilmiştir.

## Kullanılan Teknolojiler
1. HTML
2. CSS
3. Javascript
4. React
5. NextJs
6. NextAuth
7. MongoDB
8. Firebase
9. Neurelo
10. Zustand
11. Sanitize HTML
12. React Quill
13. EmailJS
14. TailwindCSS
15. React Icons
16. Styled Components
17. Vercel
18. Github