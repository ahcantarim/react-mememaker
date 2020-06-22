import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: 'Roboto', sans-serif;
	}

	body {
		background: #eee;
	}

	a {
		text-decoration: none;
		color: hsla(0,0%,100%,.7);

		&:hover {
			text-decoration: underline;
		}
	}

	button,
	input {
		outline: 0;
	}

	button {
		cursor: pointer;
	}
`;