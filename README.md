# HW4-NguyenToan
## Short/Long polling and socket with demo chatbot
### To run program in terminal
1. Clone this repo: `git clone https://github.com/wad-itmo-vnit/HW4-NguyenToan`
2. Install requirement packages: `pip install -r requirements.txt`
3. Run the server: `python app.py`
### Chatbot discription
**Chatbot analyzes movie reviews and gives appropriate behavior sentences for each type of customer attitude**
1. Every 10 seconds the server will invite customers to leave a review of the movie they have watched.

2. After customers submit any review, the bot will analyze whether that review is positive or negative and respond to customers on a case-by-case basis: <br>
  - If positive reviews:
    > - Thank you for watching this film. If you don’t want miss good films, subscribe our channel.
    > - Thank you for appreciating film. We hope you will enjoy it.
    > - We are delighted to have helped you find the perfect films for your life. Thank you for trusting and choosing our films.
    > - We are really glad that you found what films you love. We sincerely thank you for visiting and enjoy our films.
  - If negative reviews:
    > - Thank you for visiting our movies. Through the discussion, we knew we need to improve further. With the motto of always putting customer satisfaction first, we look forward to providing you with even more impressive choices.
    > - Thank you for visiting our movies even though it has not really made you satisfied. We’re thankful your feedback as it will help us to improve in the future. Come back to us!
    > - We sincerely thank you for watching our movies. Your feedbacks are the motivation for us to improve more and more. Once again, we look forward to serving you many more times.

**Since this is a simple demo version, the accuracy rate of the analysis results is only about 80%.**

