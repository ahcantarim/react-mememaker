import React from 'react';

import { HeaderRoot, HeaderItem, HeaderItemFull } from './styles';

import githubLogo from '../../images/GitHub-Mark-Light-32px.png';

export default function Header() {
    return (
        <HeaderRoot>
            <HeaderItem>
                <a href="https://github.com/ahcantarim" target="_blank">
                    <img src={githubLogo} alt="View on GitHub" />
                </a>
            </HeaderItem>
            <HeaderItem><a href="https://github.com/ahcantarim" target="_blank"><strong>ahcantarim</strong></a></HeaderItem>
            <HeaderItem><strong>/</strong></HeaderItem>
            <HeaderItemFull><a href="https://github.com/ahcantarim/react-mememaker" target="_blank">react-mememaker</a></HeaderItemFull>
        </HeaderRoot>
    );
}