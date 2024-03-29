# Music Controller Web App Tutorial - From Tech With Tim

My notes based on Tech with Tim's awesome tutorial series and GitHub repo. I use functional components for react instead of class based, but everything else is essentially the same as the original. Here, I outline all the steps I followed, down to the most basic and detailed instructions. I used Python version 3.10.6, and my system is Windows 10. My IDE is VSCode.

I reccommend DO NOT READ THIS, and go watch the series on YouTube instead. The main difference is in the react specific portions, I use functional components instead of class based ones. For rest of the project, I believe Tim's explanation to be much better than mine. That being said, if you would like to just read it here, I will try to explain what I do, and if I do anything different than Tim, I will be sure to explain why.

One more thing: at the end of Tim's tutorial series, he has a video explaining how to transfer the class based components to functional ones, so if you prefer video format for learning, please watch his video.

## Tutorial One - Setup

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

