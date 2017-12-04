import React from 'react';
import './search.css';

function Name(props){
	return(
		<div className='name'>
			<b>{props.name}</b>
		</div>
		);
}

function RetweetBtn(props){
	return(
		<input className='retweet' type='button' name={'rt_' + props.id} value='Retweet!' onClick={() => alert('rt_' + props.id)}/>
		);
}

function Tweet(props){
	return (
		<div>
			{<Name name={props.name}/>}
			{props.content}
			<br/><br/>
			{<RetweetBtn id={props.id}/>} 
			{<RetweetBtn id={props.id}/>}
		</div>
		);
}

class Feed extends React.Component{
	constructor(props)
	{
		super(props);
		this.state =
		{
			tweets: [
				[1,'Harsh Seth', 'Hello world'],
				[2, 'Yash Seth', 'Hi!'],
				[3, 'Gauri Singh', 'Hiii!'],
				[4, 'Harsh Seth', 'Chalo ab bas'],
				[5, 'Gauri Singh', 'Nai! Ek aur. Mera Last!'],
			],
		};
	}

	render()
	{
		return(
			<div>
			{
				this.state.tweets.map(tweet => <div className='tweet' key={tweet[0]}> <Tweet id={tweet[0]} name={tweet[1]} content={tweet[2]}/> </div>)
			}
			</div>
			);
	}
}

export default Feed