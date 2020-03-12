import React from 'react';
import './App.css';

const App = () => {
    return (
        <div className='app-wrapper'>

            <header className='header'>
                <img src='https://i.pinimg.com/236x/19/25/b7/1925b72b3e8d8df8fa22b6bff9052642.jpg'/>
            </header> 

            <nav className='nav'>
                <div>
                    Profile
                </div>
                <div>
                    Messages
                </div>
                <div>
                    News
                </div>
                <div>
                    Music
                </div>
                <div>
                    Settings
                </div>
            </nav>

            <div className='content'>
                <div> 
                    <img src='https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg'/>
                </div>
                <div>
                    ava + description
                </div>
                <div>
                    my posts
                    <div>new post</div>
                    <div>post1</div>
                    <div>post2</div>
                </div>
            </div>
        </div>
    );
}

export default App;