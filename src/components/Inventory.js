import React from 'react';
import AddFishForm from './AddFishForm';
import base from '../base';

class Inventory extends React.Component {
  static propTypes = {
    fishes: React.PropTypes.object.isRequired,
    updateFish: React.PropTypes.func.isRequired,
    removeFish: React.PropTypes.func.isRequired,
    addFish: React.PropTypes.func.isRequired,
    loadSamples: React.PropTypes.func.isRequired,
    storeId: React.PropTypes.string.isRequired
  };

  state = {
    uid: null, 
    owner: null
  };

  componentDidMount() {
    base.onAuth((user) => {
      if(user) {
        this.authHandler(null, {user});
      }
    });
  }

  handleChange = (e, key) => {
    const fish = this.props.fishes[key];
    const updatedFish = {
      ...fish, 
      [e.target.name]: e.target.value
    };
    this.props.updateFish(key, updatedFish);
  }

  authenticate = (provider) => {
    console.log(`Trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  logout = () => {
    base.unauth();
    this.setState({uid: null});
  }

  authHandler = (err, authData) => {
    console.log(authData);
    if(err) {
      console.error(err);
      return;
    }

    // grab the store info
    const storeRef = base.database().ref(this.props.storeId);

    // query the firebase once for the store data
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      // claim it as user's own if there is no owner already
      if(!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }

  renderLogin = () => {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate('github')}>Log in with Github</button>
        <button className="facebook" onClick={() => this.authenticate('facebook')}>Log in with Facebook</button>
        <button className="twitter" onClick={() => this.authenticate('twitter')}>Log in with Twitter</button>
      </nav>
    )
  }

  renderInventory = (key) => {
    const fish = this.props.fishes[key];

    return (
      <div className="fish-edit" key={key}>
        <input type="text" name="name" value={fish.name} onChange={(e) => this.handleChange(e, key)} placeholder="Fish name" />
        <input type="text" name="price" value={fish.price} onChange={(e) => this.handleChange(e, key)} placeholder="Fish price" />
        <select type="text" name="status" value={fish.status} onChange={(e) => this.handleChange(e, key)} placeholder="Fish status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>        
        </select>
        <textarea type="text" name="desc" value={fish.desc} onChange={(e) => this.handleChange(e, key)} placeholder="Fish desc">
        </textarea>
        <input type="text" name="image" value={fish.image} onChange={(e) => this.handleChange(e, key)} placeholder="Fish image" />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>        
      </div>
    )
  }

  render() {
    const logout = <button onClick={this.logout}>Log Out!</button>

    if(!this.state.uid) {
      return <div>{this.renderLogin()}</div>
    }

    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    const {fishes} = this.props;

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

export default Inventory;