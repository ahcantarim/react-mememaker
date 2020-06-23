import styled from 'styled-components';

export const Body = styled.div`
    margin-top: 64px;
    padding: 50px 100px 50px 50px;
`;

export const Templates = styled.div`
    width: 100%;
    height: 250px;
    background: #eee;
    border-radius: 4px;
    overflow-y: auto;
    display: flex;
    align-items: center;
    padding: 0 15px;
    margin-bottom: 30px;

    button {
        background: transparent;
        margin-right: 10px;
        border: 5px solid transparent;

        &.selected {
            border-color: #1890ff;
            border-radius: 4px;
        }

        img {
            width: 200px;
            height: 200px;
            border-radius: 2px;
        }
    }
`;