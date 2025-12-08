import React from "react";
import Banner from "../Banner/Banner";
import BookAlertUI from "../BookAlerttUI/BookAlertUI";
import NewsletterSubscription from "../NewsletterSubscription/NewsletterSubscription";
import AuthorsOfMonth from "../AuthorsOfMonth/AuthorsOfMonth";
import Coverage from "../Coverage/Coverage";

const Home = () => {
  return (
    <div className="">
      <Banner></Banner>
      <BookAlertUI></BookAlertUI>

      <AuthorsOfMonth />
      <Coverage></Coverage>
      <NewsletterSubscription></NewsletterSubscription>
    </div>
  );
};

export default Home;
