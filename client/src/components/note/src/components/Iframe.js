
import React, { useContext } from 'react';
import { DarkContext } from '../contexts/DarkContext'

function color(isDark) {
    if (isDark) return `<style>
    *{
        color:white
    }
</style> `

    return `<style>
    *{
        color:black
    }
</style> `
}

const Iframe = ({ content, title }) => {
    const { isDark } = useContext(DarkContext)

    const writeHTML = (frame) => {
        if (!frame) {
            return;
        }
        let doc = frame.contentDocument;
        doc.open();
        doc.write(content + color(isDark));
        doc.close();
        frame.style.color = 'white !important';
        frame.style.width = '100%';
        frame.style.height = `${frame.contentWindow.document.body.scrollHeight}px`;
    };
    return (
        <iframe src="about:blank" scrolling="no" frameBorder="0" ref={writeHTML} title={title} />
    );
};
export default Iframe;