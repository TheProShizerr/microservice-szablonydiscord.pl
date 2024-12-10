# 🌐 Mikroserwis dla szablonydiscord.pl

## 🎯 Opis projektu

Ten mikroserwis został zaprojektowany specjalnie dla platformy [szablonydiscord.pl](https://szablonydiscord.pl), aby **monitorować i weryfikować działanie szablonów Discorda**. Jest udostępniany jako niezależny komponent, ponieważ główna aplikacja nie może być obecnie publicznie dostępna.

### 🚀 Główne funkcjonalności:
- 🔍 **Skanowanie szablonów Discord**:
  - Codzienna weryfikacja poprawności około **4000 szablonów**.
- 🛠️ **Obsługa kolejek przy użyciu BullMQ i Redis**:
  - Wydajne i niezawodne zarządzanie zadaniami.
- 📂 **Integracja z bazą danych**:
  - Przechowywanie informacji o szablonach i wynikach ich skanowania.
- 📡 **Protokół komunikacji TCP**:
  - Skalowalna wymiana danych między systemami z wykorzystaniem protokołu TCP.

---

## 🛠️ Technologie

Ten mikroserwis opiera się na solidnych technologiach backendowych, które zapewniają wydajność i skalowalność:
- **NestJS** 🟢 - Modularny framework Node.js do budowy aplikacji backendowych.
- **BullMQ** 🛠️ - Zarządzanie kolejkami zadań w oparciu o Redis.
- **Redis** 🔴 - Pamięć podręczna i system kolejkowy.
- **Discord API** 🤖 - Integracja do weryfikacji danych szablonów.
- **Firebase** 🔥 - Zarządzanie danymi o szablonach.
- **TCP Protocol** 🌐 - Komunikacja między mikroserwisami.

---

## 🏗️ Jak działa mikroserwis?

1. Na stronie [szablonydiscord.pl](https://szablonydiscord.pl) znajduje się aktualnie około **4000 szablonów**.
2. Mikroserwis automatycznie dodaje zadania do kolejki BullMQ, aby każdy szablon był skanowany **raz na 24 godziny**.
3. Informacje o szablonach są pobierane z **Firebase**.
4. Następnie mikroserwis komunikuje się z **Discord API**, aby sprawdzić, czy szablony są nadal aktywne i poprawne.
5. Wyniki skanowania są zapisywane w bazie danych, co pozwala na łatwe zarządzanie danymi na platformie.

---

## 🔧 Instrukcja uruchomienia

1. **Skopiuj repozytorium**:
   ```bash
   git clone https://github.com/TheProShizerr/microservice-szablonydiscord.pl
