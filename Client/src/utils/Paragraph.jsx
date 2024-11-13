import React from 'react';
import { renderSentence } from './functions/format.text.jsx';

const Paragraph = ({ paragraph, showIndex = false, index, styles }) => {
    return (
        <p className={`text-base ${styles} text-text`}>
            <span>{showIndex && <strong className="pr-1 font-semibold">{index}.</strong>}{renderSentence(paragraph)}</span>
        </p>
    );
}

export default Paragraph;
