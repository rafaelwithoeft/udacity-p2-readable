import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './components/NavBar';
import CategoryList from './components/category/CategoryList';
import PostCreate from './components/post/PostCreate';
import PostUpdate from './components/post/PostUpdate';
import PostDetail from './components/post/PostDetail';
import CommentCreate from './components/comments/CommentCreate';
import CommentUpdate from './components/comments/CommentUpdate';
import PostList from './components/post/PostList';

const App = () => (
	<div className="app">
		<NavBar />
		<div className="container-fluid">
			<div className="row">
				<div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
					<CategoryList />
				</div>
				<div className="col-12 col-sm-12 col-md-6 col-lg-8 col-xl-9">
					<Switch>
						<Route exact path="/post/create" component={PostCreate} />
						<Route exact path="/post/update/:post" component={PostUpdate}/>
						<Route exact path="/:category/:post" component={PostDetail} />
						<Route exact path="/:category/:post/comment/create" component={CommentCreate} />
						<Route exact path="/:category/:post/comment/update/:comment" component={CommentUpdate} />
						<Route component={PostList} />
					</Switch>
				</div>
			</div>
		</div>
	</div>
);

export default App;