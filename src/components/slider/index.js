import './index.less';
import logo from '../../assets/userLogo.jpeg';
import React, { Component } from 'react';
import { Icon, Avatar, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios'

class SliderRight extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			keyword: '',
			type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
			pageNum: 1,
			pageSize: 50,
			list: [],
			linkList: [],
			filingList: [
				{
					id: 1,
					name: '2018-12-12',
					urlId: '/home',
				},
				{
					id: 2,
					name: '2018-12-12',
					urlId: '/home',
				},
				{
					id: 3,
					name: '2018-12-12',
					urlId: '/home',
				},
			],
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.loadLink = this.loadLink.bind(this);
	}

	componentDidMount() {
		this.handleSearch();
		this.loadLink();
	}
	loadLink = () => {
		axios.get("http://localhost:3001/mock/getLinkList.json", {}).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				this.setState({
					linkList: res.data.data.list,
				});
			} else {
				message.error(res.data.message);
			}
		})
	};

	handleSearch = () => {
		axios.get("http://localhost:3001/mock/getTagList.json", {}).then(res => {
			if (res.status === 200 && res.data.code === 0) {
				this.setState({
					list: res.data.data.list,
				});
			} else {
				message.error(res.data.message);
			}
		})
	};

	handleClick(event) { 	}
	render() {
		const list = this.state.list.map((item, i) => (
			<Link className="item" key={item._id} to={`/home?tag_id=${item._id}&tag_name=${item.name}&category_id=`}>
				<span key={item._id}>{item.name}</span>
			</Link>
		));
		const linkChildren = this.state.linkList.map(item => (
			<a key={item._id} target="_blank" rel="noopener noreferrer" href="/">
				<Icon
					key={item._id}
					type={item.icon}
					theme="outlined"
					style={{ fontSize: '20px', marginRight: '10px' }}
				/>
			</a>
		));

		return (
			<div className="right">
				<Avatar className="right-logo" src={logo} size={130} icon="user" />
				<div className="title">BiaoChenXuYing</div>
				<div className="introduce">
					<div className="title">个人介绍</div>
					<div className="content">
						分享 WEB 全栈开发等相关的技术文章，热点资源，全栈程序员的成长之路。
					</div>
					<div className="footer">{linkChildren}</div>
				</div>
				<div className="tags">
					<div className="title">标签云</div>
					{list}
				</div>
			</div>
		);
	}
}

export default SliderRight;
