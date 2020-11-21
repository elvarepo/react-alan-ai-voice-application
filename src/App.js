import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles';
import { wordsToNumbers } from 'words-to-numbers';

const alanKey = 'd4f18fdf15d4a3134d2df9819459b9f82e956eca572e1d8b807a3e2338fdd0dc/stage'
const App = () => {
    const [activeArticle, setActiveArticle] = useState(-1);
    const [newsArticles, setNewsArticles] = useState([]);
    // const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles();
    console.log(activeArticle, '');

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === "newHeadlines") {
                    console.log('.....');

                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'highlight') {
                    console.log(activeArticle, 'active Article');

                    setActiveArticle(count => count + 1);
                } else if (command === 'open') {
                    // console.log(number, 'number....');
                    const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzz: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > 20) {
                        alanBtn().playText('Please try that again.')
                    } else if (article) {

                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...')
                    }
                    // window.open(articles[number].url, '_blank');
                }
            }
        })
        console.log('running in App.js ...');
    }, [activeArticle]);
    // console.log('running in App.js ...');
    return (
        <div>
            <div className={classes.logoContainer} >
                <img src="https://alan.app/voice/images/previews/preview.jpg" className={classes.alanLogo} alt="alan logo" />
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
        </div>
    );
}

export default App;