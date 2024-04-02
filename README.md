# Music Controller Web App Tutorial - From Tech With Tim

My notes based on Tech with Tim's awesome tutorial series and GitHub repo. I use functional components for react instead of class based, but everything else is essentially the same as the original. Here, I outline all the steps I followed, down to the most basic and detailed instructions. I used Python version 3.10.6, and my system is Windows 10. My IDE is VSCode.

I reccommend DO NOT READ THIS, and go watch the series on YouTube instead. The main difference is in the react specific portions, I use functional components instead of class based ones. For rest of the project, I believe Tim's explanation to be much better than mine. That being said, if you would like to just read it here, I will try to explain what I do, and if I do anything different than Tim, I will be sure to explain why.

I also tried to keep all the names the same as in the video, so if you are watching the video and looking here for some specific stuff, hopefully there are no problems with different names. 

One more thing: at the end of Tim's tutorial series, he has a video explaining how to transfer the class based components to functional ones, so if you prefer video format for learning, please watch his video.

This web app is a music room, where a host a can create a room and play music, and guests can join and control the playback.

*A note on "I" vs "We": like I said, most of this is just Tim's tutorial series. I felt it would be confusing to write "Tim did this" for everything, so I stuck with a generic 'we' to represent me, Tim, and hopefully you too. For parts where I differed from the tutorial I tried to use "I" so it is a bit less confusing, but I am sure I mixed it around at some parts.

*Why are you reading this when you could be watching the tutorial? Go do that.

*I said go

## Tutorial One - Setup
https://www.youtube.com/watch?v=JD-age0BPVo&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=1 

### Setup - virtualenv
Make sure to have Python installed, and create a new folder in File Explorer. In VSCode, right click in the explorer, and select "Add Folder to Workspace". Add the new folder you created, I called mine "Django Course". VSCode should detect your Python version, if it doesn't you can follow these steps: press CTRL+SHIFT+P, to open the search menu, and search for 'intepreter'. Select 'Python:Select Interpreter', choose the project directory, and the version of Python.

Next, open a terminal window. I reccomend using Powershell, but VSCode might ahve set Command Prompt as default. To change that, press CTRL+SHIFT+P again, and search for 'Terminal'. Select 'Terminal:Select Default Profile', and choose Powershell to change the default terminal that opens up. Alternativly, you can change the profile in the terminal window itself. 

In the terminal, type 

```bash
python --version
```

to make sure of your python version, and that it was installed correctly.

Next, type

```bash
pip install virtualenv
```

to install the virtual environment package. I used virtualenv because I prefer it over the default venv. We are using a virtual enviroment to keep all our packages in one place, without installing them directly onto our system.

To create a cirtual environment, type

```bash
virtualenv venv
```

venv is just the name of the environemnt, it can be anything. By convention, we choose venv. You should see a new folder appear in the VSCode explorer.

Next, start the venv. (Note: command works only for Powershell)

```bash
.\venv\Scripts\activate.ps1
```

Now, your terminal should say (venv) PS PathToDirectory>

### Create the Django Project
First, we need to install django and djangorestframework. You could either install them manually

```bash
pip install django djangorestframework
```

or create a requirements.txt file, write django on the first line, and djangorestframework on the second, then type

```bash
pip install -r requirements.txt
```

To create the requirements.txt file based on currently installed packages,

```bash
pip freeze > requirements.txt
```

Now, create the Django project.

```bash
django-admin startproject music_controller .
```

music-controller is the name I chose, and the . at the end tells Django to make the current directory the main one. Otherwise, you will have DjangoCourse/music_controller/subfolders, instead of DjangoCourse/subfolders.

At this point, your directory should look like this

put image here

### Overview of the Files
Outside of the music-controller folder, the only new file is manage.py. This is what we will use from now on instead of django-admin to run all the same commands. Next, we have the music_controller folder. Open it, and take a look at the files inside.

We can ignore the \_\_init\_\_.py, asgi.py, and wsgi.py for now. The other two python files, settings.py and urls.py are the ones we will add code to.

settings.py holds the information about our project. We will add references here to INSTALLED_APPS when we want to add a new app, and MIDDLEWARE if we want to add a, well, middleware. urls.py is where we will specify where we want specific endpoints to go.

### Creating the First App
The first app will be called api, and will hold our backend Django server. Here, we will do everything with our websites data, but it will hold no frontend information.

```bash
python manage.py startapp api
```

A new folder should have appeared in 'DjangoCourse' called 'api'. We see some of the same files, and some new ones as in music_controller. models.py will hold our data models, views.py will have our code for the api endpoints. If we were not using react for a frontend, we would have the frontend be here.

Since we created a new app, now we need to add it to the settings.py in music_controller. Navigate to the INSTALLED_APPS, and add

```python
"api.Apps.ApiConfig",
"rest_framework",
```

to the end. Now, our Django Project is connected to this new app. Note that ApiConfig is the class name that comes from apps.py in the api folder. If you named your app something different, keep that in mind.

We will now quickly set up our first view, so we can see something when we run our webpage. We will be changing this later, but for now it is nice to make sure that what we have works.

In views.py in the api folder, we can make our first view (page on our website). For now, we will display some basic text.

Import HttpResponse, we will not use it after this, but we need it for now to show something on the page.

```python
from django.http import HttpResponse
```

Now create the view function.

```python
def main(request):
    return HttpResponse("Hello")
```

To have the view attached to an endpoint, we need to edit the urls.py files. The api folder does not have one yet, so create a new file and call it urls.py. Leave it blank for now. In the urls.py file in music_controller, we will tell the website what apps we want to navigate to based on the endpoint, and then go to that apps urls.py file for more specific endpoints.

For now, first change line 18 in the music_controller urls.py to 

```python
from django.urls import path, include
```

In the urlpatterns list, add

```python
path("api/", include('api.urls')),
```

Now, anytime we navigate to domainname.com/api/whatever, our website will look to the utls.py in the api app to find that "whatever". For now, our domain name will just be your local server address, so 127.0.0.1:8000 by default. If you were to deply this Django website, the domain name would change.

Back in the newly created urls.py in the api folder, add the improt statements and create the url pattern.

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.main)
]
```

Here, we say that when api endpoint is blank, display the view we made. So when we boot up the server, and go to http://127.0.0.1:8000/api/ , we will see our view! 

### Running the Server

Before we run the server, there are a few commands we need to run to initialize the database. We don't ahve a database right now, but Django has an admin related database by default.

```bash
python manage.py makemigrations
python manage.py migrate
```
Later on we may have to run these commands again, but for now just run them at the begening ov very Django project before you run the server. 

Now to actually run the server, we have a couple different methods. The most basic method is 

```bash
python manage.py runserver
```

This will run the server on port 8000, and you will be able to follow the link in the terminal to the website. You will see a 404 page not found, but if you go up to the url and type /api/, you will see the view. In the terminal you can press CTRL+C to shut down the server, or leave it running because it will automatically update whenever you save one of your files. You only need to refresh the page in the browser to see the changes. 

The second way of running, which I reccommend, is to use the VSCode debugger. I like doing this because I can either run without debugging to quickly open the server, or actually add in break points and run the full debugger. If you don't have expierence with debugging or with the VSCode debugger, this is not the right place to learn it, but I do reccommend trying it out for yourself and learn by doing.

To set it up, click on the debugger icon in the left. Then, in the top left, choose the VSCode project you want to track. I chose Python Debugger, and then Python Debugger:Django. Once that is done, you can feel free to use the debugger to its full extent, or simply use it to tun the server by pressing CTRL+F5. This will open a new terminal, which I like because it is an easy way to keep my server terminal separate from the terminal window I type commands into. By default the server is also run on port 8000, so if you want to debug and run the server normally, you will need to change this port for the debugger. 

### Creating a git repository
This is separete from Tim's tutorial, you can skip it completley, but I reccommend doing some type of version control for your projects, even if just to get familiar with it. I will talk later about creating a GitHub repo and all that, for now lets just make a basic git repository so we can track changes made.

If you are a more advanced git user, feel free to skip this section as well, as I will only cover the very basics. 

To install git, go to https://git-scm.com/downloads and download the latest version. After that, you should be good to use git commands in the terminal.

In the terminal, type

```bash
git init
```

to initialize a git repository. Before we make any changes, lets add a .gitignore file. This will let you specify files or directories to not track. Add a new file to the DjangoCourse folder, and call it .gitignore. For now, we will onyl add the db.sqlite3 file. We don't want to add the database to git or GitHub, when we later push the repo.

Simply type `db.sqlite3` in the gitignore file, and you chould see it go from green to grey, assuming you are using VSCode. There also might be other stuff we don't need to track at this point, but for now I just put the database file. 

VSCode also has it's own way to interact with git, instead of the command line. I will give the command here, but if you prefer to use the built in integration that is up to you.

Next, let's add all the files to the staging area for our initial commit.

```bash
git add -A
```

This will add all changed files to the staging area. We can view this staging are if we want to.

```bash
git status -v
```

You can omit the -v if you want to, it is the 'verbose' flag and explicitly shows all the changes to the files. 

`git status` simply shows the status of the working directory and the staging area. If you want to view only the files that have been changed, us

```bash
git diff --cached --name-only
```

Next, commit the staging area.

```bash
git commit -m 'Initial commit'
```
Note, you need to add a message to every commit. If you don't add the -m flag and type your message in the command line, a window will open where you can type your message instead.

Now, if we run `git status` again, we see that there is nothing to commit. For now, we will only use `git add` and `git commit`. There is so much more to git, but that would take a course unto itself, so for now we will stick to basics.

## Tutorial Two - Djanog REST Framework

https://www.youtube.com/watch?v=uhSmgR1hEwg&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=2 

### Creating Our First Model

Django's models allow us to store data in a database using Python, instead of an external database. Now, we could connect to a MySQL database or something and sort data in there instead, and if you are comfortable to do that go right ahead. We will focus on Django for this tutorial.

The first model we make will be a Room model, to hold the data we want associated with each room.

Go to the models.py in the api folder, and create a Room class.

```python
class Room(models.Model):
    code = models.CharField(max_length=4, default="", unique=True)
    host = models.CharField(max_length=50, unique=True)
    guest_can_pause = models.BooleanField(null=False, default=False)
    votes_to_skip = models.IntegerField(null=False, default=1)
    created_at = models.DateTimeField(auto_now_add=True)
```

Models in Django are represented by classes. We can give each class attributes and methods, and build out our model.

These are the attributes we will use, although you could add your own or omit ones you don't like. The max lengths of things don't matter too much, I chose 4 for my code while in the video Tim chooses 8. The host will be a generated key that we will get into in a later tutorial.

In general, we want to have most of the code logic in our models, and have our views be relatively sparse. For this project it won't matter a whole bunch, but keep that in mind if your own project is more complex. 

Next, we create a function to generate a random code each time a room is created

First, add these imports

```python
import random 
import string
```

The function will first generate a random list of ASCII characters, then query all the open rooms to see if the codeis in use. If it is, we generate another one and repeat. If not, we've got our code!

```python
# Generate a code, check if it exists already, reapeat
def generate_unique_code():
    # Define the length of the code
    length = 4
    
    # Until we find a unique code, keep generating new ones
    while True:
        # Generate a string of all uppercase letter, choose 4 random ones, and join them into a single string
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        
        # Get a list of all rooms with a code equal to the generated code. If there are none, BOOM unique code
        if Room.objects.filter(code=code).count() == 0:
            return code
```

In the video, Tim adds a break to the if statement, and returns outside the while loop, I prefer this way.

Since we have changed our model, we need to makemigrations and migrate again.

```bash
python manage.py makemigrations 
python manage.py migrate
```

Make sure you are in the root directory for this. Now, go back to the code attribute, and change default to read `default=generate_unique_code`. Do not add the parentheses. We have to migrate first to actually create the Room model, because we use it in generate_unique_code(). If we tried to change the attribute before migrating, we would get a 'Room is undefined" error. So now just makemigrations and migrate one more time. Tim doesn't do this until a bit later, but I decided to do it now while we are here in the models.py.

Now is a good time to commit to git. In general, it is a good idea to commit every time you make a feature change at least. I won't take the time in the future to remind you, but committing often is good practice. If you think you might break the server, you can make a branch and commit to there. Since I am the only one working on my project, I will commit to the main branch only, but it really is good practice to not do that.

To commit a specific file:

```bash
git add api/models.py
```
And then you could commit as normal. In this case, I reccomend -A instead of the file name, because the migrations will have changed as well. BUT if you only change a single file, or a couple files, commit them one by one by filename. Again, for a project this small and working on your own it doesn't matter a whole lot, but it is best practice.

### Creating an API View
First, we need to create a serializer. We will create more than one, but essentially a serializer is a way to translate between JSON data (the type we would get from an HTTP POST request) and the Python code that our model can use.

Start by creating a new file in api called serializers.py. In here, we will create the serializer for the Room model.

```python
from rest_framework import serializers
from . import models

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip', 'created_at')
```

Here we create the class that will serialize the Room data, we specify what model we want it to use, and what the fields are. Notice the fields are the same as what we created in the model, except we add the 'id' field. This will be auto populated as rooms are created. Since we inherited from the serializers.ModelSerializer class, no further code is required to do what we want, the parent class provides most of the functionality. 

Next, we will create the endpoint api view to display the data. Eventually, these pages won't be visible in the final product, but for now they will be used to not only move data back and forth, but to visualize it at well.

In views.py, create the RoomView class, which will inherit from the CreateAPIView class. Just like with the serilizer, we don't need to add that much functionality, because most of it is in the CreateAPIView class we inherit from. IF you want to see more about what all of these classes do, check out the Django documentation.

We do need to define a queryset (what we want to return), which will just be all of the fields we made for the model, and a serializer to convert from JSON format to python code.

```python
from django.shortcuts import render
from rest_framework import generics
from . import serializers, models

# Create your views here.
class RoomView(generics.CreateAPIView):
    queryset = models.Room.objects.all()
    serializer_class = serializers.RoomSerializer
```

We also need to change the endpoints in urls.py.

```python
urlpatterns = [
    path('room', views.RoomView.as_view())
]
```

Now, if we navigate to api/create_room/ we will see the new APIView. The .as_view() is there because right now we want to see the view in the webpage.

To see our code in action, fill in all the fields, and click POST. You will see the space above the input fields update, and return the JSON of the data you just put in. You can make just one room, or change the host and code, and make multiple.

Now, go back to views.py and change CreateAPIView to ListAPIView. This class will let you view all of the rooms created, but not allow to create new ones.

## Tutorial Three - React integration

https://www.youtube.com/watch?v=6c2NqDyxppU&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=3

Tim goes through this step by step, and in here I will be doing so as well. He mentions there are easier ways to do set this up, but he, as well as I, think it is a good idea to learn by doing it the slow manual way like this first. If you already know how to get this up and running, go ahead and do that, and come back when you are ready to get started in react.

For the rest, lets get this install and setup going! I will assume you have npm and node.js already, as Tim covers that in the first video. If you don't there are plenty of install guides, but I will not cover it here.


### Installing the packages

First, let's just check we have npm installed. For this, we want to be in the music_controller directory.

```bash
cd music_controller
npm
```

My version of npm is 8.5.0, if you get an error here, it means you did something wrong in your npm install.

Next, we will create a new app for django to handle all of the frontend. We are going to create this inside the DjangoCourse directory, so at the same level as api and music_controller.

```bash
python manage.py startapp frontend
cd frontend
```

We will now manually create some folders to hold future files. Create three folders: src, static, and templates. In src create another folder called components, and in static create three more folders called frontend, css, and images. It should look like this: 

![Frontend app directory](/tut_images/FrontendApp.png)

Now, initialize a new npm project. This will add a bunch of files to the directory. Make sure you are in the DjangoCourse/frontend directory

```bash
npm init -y
```
Once you see the node_modules folder appear, make sure to put node_modules/ in the .gitignore file. Not doing so will massivley bloat the commit.

Now we get to the fun part: installing a bunch of pakcages that might not work. Yay!

We will use webpack to compress all out different javascript files into a single output file, and babel to make our code work on many different browsers.

```bash
npm i webpack webpack-cli --save-dev
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
npm i react react-dom --save-dev
```

Those are all the same as in Tim's video, but should be fine to get the latest version. Tim installs material-ui next, and this is the first main difference. Material-ui is now in version 5, with a v6 alpha. The syntax is different, including the install. 

```bash
npm install @mui/material @emotion/react @emotion/styled
```

We will use material ui to build nice (ish) looking webpages with minimal effort. It is sort of like Boootstrap for CSS, if you are familiar with that.

The next install is different as well. If you try the install Tim shows, you'll get a message saying it is deprecated, and point you to this package

```bash
npm i @babel-plugin-transform-class-properties
```

Next, we go back to following the video.

```bash
npm i react-router-dom
npm i @mui/icons-material
```

### Config files

Now lets set up some config files for babel and webpack. In the frontend folder, create babel.config.json

```json
{
    "presets" : [
        
        [
            "@babel/preset-env",
        {
            "targets" : {
                "node": 10
            }
        }
        ],
        "@babel/preset-react"
    ],
    "plugins" : ["@babel/plugin-transform-class-properties"]
} 
```

Next, create webpack.config.js

```javascript
const path = require("path");
const webpack = require("webpack");

module.exports = (env, argv) => {
  const mode = argv.mode || "development";

  return {
    entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify(mode)
    }),
  ],
  }
};
```

This config file tells webpack where to find the javascript files, and where to bundle them to. It will only work if you have named the directories the same, so if you changed them earlier, change them here too. My config file looks a bit different than Tim's. This is to get around a warning that appeared everytime I ran `npm run dev`, that said "Conflicting values for process.env.Node_ENV". This error shows up if you have defined the run mode (in this case 'dev') in the package.json, but the mode in the webpack config file says production. It is not the end of the world if you see that error, your code will still run fine. However, I wrapped the config in a function, so that the mode would change depending on which mode was run in the command line. That way, both dev and production match up.

Lastly, we will go the package.json and add two scripts, one to run for development, and one to run for production.

```javascript
"scripts": {
    "dev": "webpack watch --mode development",
    "build": "webpack --mode production"
  },
```

For the newer version of webpack I am using, the 'watch' needs to go before '--mode'.

### Creating Our First Page

First, we will create the entry point javascript file. Add index.js to the src/ folder.

The game plan is to create a minimal HTML template to link to Django, and the have our react code take over that HTML file to create our webpage.

In the templates folder, make a new folder called frontend, and in there make an index.html file.

I used the html-5 boilerplate VSCode extension, you do not need it, but you can install it in the VSCode extensions tab if you want. We want to set up a very basic html page, we will add jquery and the roboto font from GoogleFonts as well.

```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Music Controller</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {% load static %}
        <link rel="stylesheet" type="text/css" href="{% static "css/index.css" %}">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
    </head>
    <body>
        <div id="main">
            <div id="app"></div>
        </div>
        <script src="{% static "frontend/main.js" %}" ></script>
    </body>
</html>
```

Now lets go views.py in the frontend folder and set that up. The view will render the html file we just made.

Don't forget, we need to make an endpoint to point to this view. We need to create a urls.py, add the app url to the urls.py in music_controller, AND add the frontend app to the settings.py file.

add to urls.py in music_controller:

```python
path("", include('frontend.urls')),
```

add to settings.py in INSTALLED_APPS:

```python
"frontend.apps.FrontendConfig",
```

add to urls.py in frontend:

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index)
]
```

Almost there! In the next section we will use react to actually show something on the webpage.

### Creating A Component in React

First, go to src/components and create App.js.

Imports:
```javascript
import React from "react";
import { render } from "react-dom";
```
Component:
```javascript
export default function App()
{
    return (<h1>Hello There!</h1>);
}
```

Show the component on the html page:
```javascript
const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(< App tab="home"/>);
```

This is the beginning of the main divergence between this project and Tim's version. This is a functinoal component, as opposed to the class based component shown in the video. You can see the imports are a little different, and the component itself is much simpler.

In addition, react-dom 'render' has been replaced by 'createRoot'. You can still use render if you would like, but you'll get an warning telling you its been deprecated.

Last couple things: first, we need to add App to the index.js.
```javascript
import App from './components/App';
```

Next, we need to run the webpack development script we added in package.json. Make sure your server is running and you have erros first, then in the terminal, in the frontend directory type

```bash
npm run dev
```

If it runs ok, it will auto update everytime the javascript is changed, and bundle it all into one main.js file in static/frontend/. I like to open a third terminal at this point, and have one for webpack, one for the server, and one to type commands in. Just make sure to cd to the correct directories before running commands.

All that being said, navigate to the home page of your website, which is just the localhost without any endpoints, and you should see your page being rendered!

## Tutorial Four - React Router

https://www.youtube.com/watch?v=YEmjBEDyVSY&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=4

My code differs from the video here as well, as the syntac for using the Router is dfferent as of 2022.

### Add Styling to the App

We have already set up the index.html to have a stylesheet, but we haven't actually created the stylesheet yet. Go to the static/css folder, and create index.css. You can name iit something else, as long as you also change the index.html to reflect the change.

In the css folder we will make a few basic changes, but we will use material ui in our react code for most of the actual styling. You can, of course, add more to your css file if you want to.

```css
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    /* color: white; */
}

#main{
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
}

#app{
    width: 100%;
    height: 100%;
    display: flex;
}
```

We are making the page fullscreen, and then changing some properties for the two divs we have in index.html. Later, Tim is going to add a gradient background that the white text will look good on, but for now the page background is white so I will leave that commented out.

### React Components

I reccommend checking out the react page for learning - https://react.dev/learn

This is where I found most of the logic for functional components I use in this project.

For the basics, react works via Components. A component is a function that returns some html. We build a page out of many different components.

In the video, Tim talks about props. I will skip props here, because they work quite differently with functional components, but we will use them later when we actually need to. He also breifly mentions state, which we will also skip for now and return to when we need to use it.

Lets start coding now! Make three new files called HomePage.js, JoinRoom.js, and CreateRoom.js in the src/components directory. We are going to create multiple pages, Route to them in the HomePage, and show the HomePage in the App.js file.

My code looks different than in the video due to the react-router-dom being a new version, and my use of functional components. However, the process is the same, the syntax is just a bit different. 

In App.js, change the return statement to this:

```javascript
return (
        <div>
            <HomePage />
        </div>
        
    );
```

Make sure to import the home page as well.
```javascript
import HomePage from "./HomePage";
```

Everything else can stay the same. Here, we are just telling our App function to return the HomePage component, which will have the navigation to our other pages built in to it.

HomePage.js:

```javascript
import React from "react";
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function HomePage(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<p>This is the home page</p>} />
                <Route path="/join" element={<JoinRoom />} />
                <Route path="/create" element={<CreateRoom />} />
            </Routes>
        </Router>
    );
}
```

The Router component from react-router-dom allows us to provide navigation to other components based on a url endpoint. Notice that for the home page, we don't add the 'exact' keyword like in the video. The Route component now has that excact functionality by default, so we don't need to specify it anymore. 

JoinRoom.js:

```javascript
import React from "react";

export default function JoinRoom(){
    return <p>This is the join room page.</p>;
}
```

CreateRoom.js:

```javascript
import React from "react";

 export default function CreateRoom(){
    return <p>This is the create room page.</p>;
}
```

Before we can see the pages, we need to add the urls to the frontend urls.py. Since react handles the 'view' we can point all the urls we add to views.index.

```python
urlpatterns = [
    path('', views.index),
    path('join/', views.index),
    path('create/', views.index)
]
```

Now you should be able to navigate to '/', '/join', and '/create' and see your pages!

## Tutorial Five - POST Requests

https://www.youtube.com/watch?v=k6ELzQgPHMM&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=5

### API View

We are now going to create the backend view that will let users create new rooms.

Start by navigation to api/serializers.py and add a new serializer, this time to create a room. Add the CreaeRoomSerializer class to the file.

```python
class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Room
        fields = ('guest_can_pause', 'votes_to_skip')
```

Note that the only fields we have in this serializer are the fields that the user will change, and aren't auto generated. We don't need to POST the code, or host, because we create those in the backend already. We only need to POST the fields the user can access and change from the webpage.

Next, go to api/views.py and add these imports.

```python
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
```

These imports will allow us to create a custom Response with a specified HTTP status code.

Add CreateRoomView class. Here, we will finally generate the host field, wich will be the session key of the user.

```python
class CreateRoomView(APIView):
    # Define which serializer we want to use
    serializer_class = serializers.CreateRoomSerializer
    
    # Send a post request
    def post(self, request, format=None):
        # Does the session exist? If not, let's create one
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        # Send data to the serailzer to be translated into python code
        serializer = self.serializer_class(data=request.data)
        # Is the data valid?
        if serializer.is_valid():
            # Set the model values to the data from the webpage
            guest_can_pause = serializer.data.get("guest_can_pause")
            votes_to_skip = serializer.data.get("votes_to_skip")
            host = self.request.session.session_key
            
            # If the session does already exist, we want to update the existing fields, not create new ones
            
            # Returns a list of rooms that satisfy the filter
            queryset = models.Room.objects.filter(host=host)
            if queryset.exists():
                # There will only be one item in the list, but we still need to get just that item
                room = queryset[0]
                # Set the values
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                # Save the room, tell it which fields we are updating
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                # Return the room in our HTTP response
                return Response(serializers.RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                # Create new room
                room = models.Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip)
                room.save()
                # Return the room in our HTTP response
                return Response(serializers.RoomSerializer(room).data, status=status.HTTP_201_CREATED)
            
        # This should only return if our inputs are bad    
        return Response({'Error':"Input not valid"}, status=status.HTTP_400_BAD_REQUEST)
```

The only thing I have added here is the final return statement, which is not 100% necessary but I like to have it. Dont forget to add this view to api/urls.py as well.

```python
path('create_room', views.CreateRoomView.as_view()),
```

Now, when you navigate to api/create_room/, you should be able to change the values of votes_to_pause, and guest_can_skip, and see the changes update on screen.

And you can still go to api/room/ at any point to see a list of all the rooms you have created. 

## Tutorial Six - Material UI Components
https://www.youtube.com/watch?v=bQXhG1eZGLM&list=PLzMcBGfZo4-kCLWnGmK0jUBmGLaJxvi4j&index=6

In this video, Tim makes the CreateRoom page frontend, with React and MaterialUI. In my code I will be going over the differences due to functional components and changes in materialUI.

### Setting Up the Frontend
First, we need to import a whole bunch of MaterialUI components. I do reccommend the MaterialUI documentation, especially if something in this tutorial is not making any sense to you.

First off, the import statements themselves are going to look different. In the video, the syntax is '@material-ui/core/ComponentName'. For my version of MaterialUI, it will be '@mui/material/ComponentName'. I don't beleive any of the component names themselves have changed, but if so I will note it.

Go to frontend/CreateRoom.js

Big 'ol list of imports:
```javascript
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
```

I will explain each component as we use it, so for now just paste the list of imports at the top.

### The CreateRoom function

First, we want a variable to hold the default amount of votes to skip. You cna choose whatever number you want here, I went with 1. All of this code will be in the CreateRoom function.

```javascript
const defaultVotes = 1;
```

One thing we don't need is the render() function wrapping our return statement like in Tim's video. The functional components handle all that for us, and it gets rendered at the very end inside App.js.

Start the return statement.
```javascript
return (
        <Grid container spacing={1}>

        </Grid>
    );
```

The Grid component is similar to flexbox in CSS, and will hold all of our other components inside of it. The 'spacing' attribute tells the grid how far apart we want each item, and you can play around with that value until you like the look.

Each Grid in a page needs at least two components. A 'Grid container', and one or more 'Grid items'. The first Grid item will be the page title.

We give the Grid item an xs={12} attribute. This means that the item will span the entire Grid container. We add a Typography comonent inside, to be the page title, and lastly write the title. At the end, the full Grid should look like this.

```javascript
<Grid container spacing={1}>
    <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
            Create A Room
        </Typography>
    </Grid>
</Grid>
```

Try changing the 'component' and 'variant' attributes to h1-6 and see what it does to your title.

The game plan now is to make a bunch of `<Grid item>` components, each one representing something we want on our page. These will be: radio buttons to choose if guests can pause, a text field to type in the votes to skip, and two buttons, one to go back to the home page, and one to submit the data. Let's go!

Firt, copy and paste the grid item you have, and get rid of the typography component. 

Every time we want data to be sent, whatever component we have needs to be inside a FormControl component.

```javascript
<FormControl component="fieldset">

</FormControl>
```

We can put some text in there to be the big label for the buttons.

```javascript
<FormHelperText>
    Guest Control of Playback State
</FormHelperText>
```

Underneath that, but still within the form control, we can finally put the Radio buttons.

```javascript
<RadioGroup row defaultValue={true}>
    <FormControlLabel value={true} control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom"/>
    <FormControlLabel value={false} control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom"/>
</RadioGroup>
```

The full grid item should be structured like this:

```javascript
<Grid item xs={12} align="center">
    <FormControl component="fieldset">
        <FormHelperText>
            Guest Control of Playback State
        </FormHelperText>
        <RadioGroup row defaultValue={true}>
            <FormControlLabel value={true} control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom"/>
            <FormControlLabel value={false} control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom"/>
        </RadioGroup>
    </FormControl>
</Grid>
```

Now, let's move on to the text field, where we can input the votes to skip.

Quick note: if you get the error: "<div> cannot appear as descendant of <p>", this is because by default, some of the MaterialUI components are tagged as <p>. So, if you try to put a <div> inside of it, you will get that error. A fix is to set the component type `component="span"`, or `component="div"`. I like span, because it comes with no formatting of its own. 

Sometimes, the formatting works for me without needing a div element, like with the FormHelperText for the radio buttons. However, for the text field, I needed the div element to align the text to the center of the input box.

```javascript
<Grid item xs={12} align="center">
    <FormControl>
        <TextField required={true} type="number" defaultValue={defaultVotes} inputProps={{min:1, style:{textAlign: "center"}}}/>
        <FormHelperText component="span"><div align="center">Votes Required to Skip</div></FormHelperText>
    </FormControl>
</Grid>
```

Without `component="span"` in the FormHelperText, you will get the error.

In the options for the TextField, we set the type, if its required or not, the efault value, and the inputProps, which lets us add an object with extra properties (note the double curly brackets). Inside, we specify the minimum value, and the text align, so that the number is in the middle of the text field.

Lastly, we will make two buttons. The first to submit the data, and the second to go back to the home page.

```javascript
<Grid item xs={12} align="center">
    <Button color="primary" variant="contained">Create a Room</Button>
</Grid>
<Grid item xs={12} align="center" >
    <Button color="secondary" variant="contained" to="/" component={Link}>Back</Button>
</Grid>
```

The variant can be any button variant built in to MaterialUI. You can look up the documentation, but a quick alternative to "contained" is "outlined" if you want to play around with it. 

We will later add onClick events to the create room button, and statuses to the text field and radio group, but for now we have got the basic components on the page.

### Hooks
The main difference between using class based components and using funstional components are Hooks. 

Per the React documentation, "Hooks are special functions that are only available while React is rendering (which we’ll get into in more detail on the next page). They let you “hook into” different React features." Anything starting with 'use', that you need to import is a Hook. And they cannot be used by class based components, only functional components.

We will use the "useState" Hook, to keep track of changes happening on our page. First, import it at the top.

```javascript
import { useState } from "react";
```

The setup and use of useState will look similar to this.state that Tim uses. First, create the state.

```javascript
const [state, setState] = useState({
        guestCanPause: true, 
        votesToSkip: defaultVotes
    });
```

Write this just under the defaultVotes variable, this is all in the CreateRoom function. Here, I define a state name 'state' anda function 'setState'. This function name can by anything. I set it equal to useState, and put the data as an object. Now, when I want the data to change, I can call the setState function, and change the data.

Even though objects are technically mutable, in React they should be treated as immutable. So instead of directly changing the data, we need to make a new object. Here is the function to handle changing the number of votes to skip.

```javascript
function handleVotesChange(e){
    setState(prevState => ({
        ...prevState, votesToSkip: e.target.value,
    }));
};
```

Again, this is below the previous code, but above the return statement. The variable 'e' can also be named otherwise. It will just be whatever data is returned from the component that we attach the function to. Next, I call the setState function, and update it. Notice I am not changing 'state' directly.

The '...' just means that all the data that was in the object, I want to stay there. I only want to change the votesToSkip. This is very useful when you need to change some items of the object, but want others to stay the same. Otherwise, we would have to rewrite the guestCanPause variable each time we change votesToSkip. Lastly, I change the votesTOSkip variable to be 'e.target.value', which is the actual value returned from the TextField component.

To hook it up to the TextField, add `onChange={handleVotesChange}` to its list of properties.

The function for handling guest can pause change is very similar.

```javascript
function handleGuestChange(e){
    setState(prevState => ({
        ...prevState, guestCanPause: e.target.value === "true" ? true : false,
    }));
};
```

The main difference here is that we don't want the actual 'e.target.value', because the RadioGroup component returns a string. Instead, we add the inline if statement to check what the string is, and assign an actual boolean value to guestCanPause based on that. Dont forget to add `onChange={handleGuestChange}` to the properties of the RadioGroup component.

### CreateRoom Function

For now, we will just make the onClick event print out to the console. Later, it will go to a new page.