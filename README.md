![header](https://res.cloudinary.com/project-3/image/upload/v1622590967/sei-readmes/headerscreenshot_xeh3iy.png)
# Project 4 - Carousel Collective

## Contents
[Overview](#overview)<br/>
[Deployed Project](#project)<br/>
[Technologies Used](#tech)<br/>
[Brief](#brief)<br/>
[Process](#process)<br/>
[Backend](#backend)<br/>
[Front-end](#frontend)<br/>
[Bugs](#bugs)<br/>
[Challenges](#challenges)<br/>
[Wins](#wins)<br/>
[Future Improvements](#future)<br/>
[Key Learning](#learning)<br/>


## <a name="overview"></a>Overview
For the final project on the General Assembly Software Engineering Immersive Course we had to create a full-stack app with Django backend and React.js front-end. We had 9 days and could work individually or in a group.</br>
I chose to work individually and created an app for a prospective fashion rental company. </br>
</br>
**Timeframe: 9 days**

### Demonstration of the app flow
![homepage1](https://res.cloudinary.com/project-3/image/upload/v1622590970/sei-readmes/homepagescreenshot1_dyaux8.png)

## <a name="project"></a>Link to Deployed Project
Link coming soon </br>
</br>

**Login User details:** </br>
username: joeb </br>
email: joeb@email.com </br>
password: Hello123!

### Installation
* Clone or Download the repo
* `pipenv` to install Python packages
* `pipenv shell` to enter virtual environment
* `python manage.py makemigrations`
* `python manage.py migrate` to migrate
* `python manage.py loaddata jwt_auth/seeds.json` to seed data for users
* `python manage.py loaddata items/seeds.json` to seed data for items
* `python manage.py runserver` to run the backend server
* `cd client` to go into client folder
* `yarn` to install front-end dependencies
* `yarn start` to start front-end server

## <a name="tech"></a>Technologies Used
**Backend:**
* Python
* PostgreSQL Database
* Django 
* Django REST Framework
* PyJWT

**Front-end:**
* React.js (Hooks)
* JavaScript
* SCSS
* Axios
* React Router DOM
* HTTP-Proxy-Middleware

**Development Tools / Other:**
* TablePlus
* Insomnia
* Git & GitHub
* Yarn
* Adobe Photoshop
* Google Fonts
* Cloudinary
* Google Chrome Dev Tools

## <a name="brief"></a>Brief
* **Build a full-stack application** by making your own backend and your own front-end.
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database.
* **Consume your API with a separate front-end** built with React.
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* **Be deployed online** so it's publicly accessible.

## <a name="process"></a>Process

### Planning

#### MVP
I chose to work on this project individually as I wanted to go through the entire full-stack development process to get more practise in areas I didn't have much experience in, such as authentication. </br>
</br>
We could build whatever type of app we wanted as long as it used Django backend and React front-end so I had a good think about how to incorporate my interests as well as the skills I wanted to develop. I decided to work on a fashion retail app and chose to focus on fashion rental, which has become more popular in recent years. </br>
I have not used rental sites before so I researched how they work by looking at the UI and functionality of sites like Hurr and My Wardrobe HQ. </br>
</br>

Since I was working on my own I knew that I should make my MVP as simple as possible whilst still meeting the brief. I decided a basic rental app should have: 
* An **index** of all the items of clothing with **show** pages for each individual item that provides more information about the item. 
* The user should be able to **Register** and **Login**.
* The user should be able to save items to a **wishlist** and add items to a **basket**.

</br>
This formed the basis of my MVP. I felt that this was a realistic amount for me to achieve on my own in 9 days, with a couple of days at the end for styling. I did plan for some additional features for if I completed my MVP early, such as the ability for a user to upload items to loan and to also add comments and ratings to items. </br>
</br>
As part of my planning I thought about the relationships I would include. I needed two different types to meet the brief. I used a many-to-many relationship for the wishlist items and a one-to-many for the rented items.</br>
</br>
Here is my plan for the items model. It has a field of current_rental_items on it as a one-to-many relationship.
</br> 


![plan2](https://res.cloudinary.com/project-3/image/upload/v1622590966/sei-readmes/proj4plan2_ohgtrv.png)

</br>

#### Wireframe
I wanted my app to have a similar function to current fashion rental sites but with the appearence of a more contemporary designer clothing retail site, such as SSENSE. I used the UI of the sites SSENSE and Shyness Space as inspiration for my wireframe. </br>
</br>

![wireframe](https://res.cloudinary.com/project-3/image/upload/v1622590966/sei-readmes/proj4wireframe1_ej0hzl.png)

<hr>

### <a name="backend"></a>Backend

#### Setting Up the Backend

* First I installed the postgresql database, then I kept it running in the background with the command `brew services start postgresql`. 
* I opened my project folder in terminal and installed Django `pipenv install django`.
* Then in VSCode terminal went into the shell `pipenv shell`. 
* Then I started the project and installed PyLint. `django-admin startproject project .` `pipenv install pylint` `touch .pylintrc`.
* I installed a package that allows Django and postgresql to talk to each other `pipenv install psycopg2-binary`.
* I also installed Django REST Framework `pipenv install djangorestframework`.
* I created my database `createdb rent-clothes-api`.
* I did my initial migration `python manage.py migrate`.
* I ran the server `python manage.py runserver`.
* In the browser I went to localhost:8000.


#### Items App

I created my Items app with the command `django-admin startapp items` and registered it in project/settings.py. </br>
I started by building out my Item Model in items/models.py:
```python
class Item(models.Model):
    name = models.CharField(max_length=80, null=True, unique=True)
    image_01 = models.CharField(max_length=300)
    image_02 = models.CharField(max_length=300)
    image_03 = models.CharField(max_length=300, blank=True, null=True)
    garment_type = models.CharField(max_length=50)
    brand = models.CharField(max_length=100)
    size = models.IntegerField()
    price = models.FloatField()
    rrp = models.FloatField()
    colour = models.CharField(max_length=100, blank=True, null=True)
    material = models.CharField(max_length=100, blank=True, null=True)
    is_available = models.BooleanField(default=True)
    description = models.TextField(max_length=800)
    current_renter = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE, related_name="items", blank=True, null=True)
```

Here is an example of the data in Insomnia:
</br>
![insomnia1](https://res.cloudinary.com/project-3/image/upload/v1622590968/sei-readmes/getitem1_ogqodz.png)


In items/urls.py I added the url endpoints that would receive the requests from the front-end. So to get the details of one single item, a GET request would have to be sent to /api/items/pk or id of item/.

```python
urlpatterns = [
    path('', ItemListView.as_view()),
    path('<int:pk>/', ItemDetailView.as_view()),
    path('<int:pk>/currentrenter/', CurrentRenterView.as_view())
]
```

In items/views.py I had classes that take requests and return responses. 

* `class ItemListView(APIView)` returns all items
* `class ItemDetailView(APIView)` returns a single item
* `class CurrentRenterView(APIView)` adds a user as a renter of an item

#### Add to Rentals

Add to rentals expects a PUT request from the front end and from that gets the user id and the item and saves it. I found the relationships on the backend particularly challenging as I couldn't think of anything I'd done that was similar to this. I could explain what I needed to do in words but not in functioning code. After some tips from a tutor I started to understand it better. </br>
This is my View for adding an item to rentals. 

```python
class CurrentRenterView(APIView):
    def put(self, request, pk):
        user = request.data.get('id')
        item = Item.objects.get(pk=pk)
        updated_item = ItemSerializer(item, data=request.data)
        if updated_item.is_valid():
            updated_item.save()
            return Response(updated_item.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_item.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```

#### jwt_auth

My jwt_auth deals with authentication, such as login and register and the user model. </br>
</br>
I built my User Model in models.py:

```python
class User(AbstractUser): 
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    wishlist_items = models.ManyToManyField("items.Item", related_name="users", blank=True)
```

This has on it a wishlist_items field as a many-to-many relationship. This is because many users can add many items to their wishlist and many items can have many users adding them to their wishlist. 

#### Wishlist 

I have my Add to Wishlist View in jwt_auth/view.py. </br>
When there is a PUT request on the frontend, this gets the user, then gets the item id off the request, adds the item to the wishlist that is on the user and then saves it. It checks if there is a user, and if there is, it adds the item to the wishlist and saves the user. 
```python
class WishlistView(APIView):
    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        item = request.data.get('id')
        if user:
            user.wishlist_items.add(item)
            user.save() 
            return Response(item, status=status.HTTP_202_ACCEPTED)
        return Response(user.wishlist_items.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
```
The WishListRemoveView is similar but includes `user.wishlist_items.remove(item)`. 

<hr>

### <a name="frontend"></a>Front-end

#### Setting up the frontend

I added the front-end before I'd completely finished the backend functionality because I knew there was a lot of work to do on it and it was nice to work on something different when I was stuck on the backend. I just had to make sure to stick to areas of the front-end that interacted with finished areas on the backend and avoid those that did not. 

* First I created the React app `npx create-react-app client --template cra-template-ga-ldn-projects`.
* Then I split the terminal and moved into client `cd client`.
* I added the http-proxy-middleware `yarn add http-proxy-middleware`.
* I ran the server in the backend `python manage.py runserver`.
* I started the server in the client folder `yarn && yarn start`.

**Components:**
* About.js - about the site (something I would add to)
* Banner.js 
* Checkout.js - non-functioning checkout (I included it for a more realistic user journey)
* Footer.js - contains link to my Github
* Home.js - image gallery that links to index page
* HowItWorks.js - basic overview of how the renting system works
* ItemCard.js - for the layout of the cards that display on the index page
* ItemIndex.js - all of the items
* ItemShow.js - to get more details about the items and ability to add to wishlist and rent
* Login.js - functionality for logging-in
* Register.js - functionality for registering
* RegLogin.js - display login and register
* UserProfile.js - the user's profile page that displays their wishlist items and rented items. 

The components that had the most functionality were ItemShow and UserProfile, so I will go into these in more detail. 

#### Adding to Wishlist & Rentals Frontend

I had my add-to-wishlist functionality on the item show component. Clicking the button would run a handleAddToWishList function that sends a PUT request to api/auth/id of user/wishlist. 

```javascript
const handleAddToWishlist = async event => {
    const payload = getPayloadFromToken()
    try {
      await axios.put(`/api/auth/${payload.sub}/wishlist/`, { id: item.id }, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
      )
    } catch (err) {
      console.log(err)
    }
  }
```

My add to rentals function sends a PUT to /api/items/idofitem/currentrenter/. This request contains all the data from the item plus the id of the logged in user (current_renter). I created a new object and spread in the data, deleting the id of the item. 

```javascript
const handleRentNow = async event => {
    const payload = getPayloadFromToken()
    const itemToUpdate = { ...item }
    delete itemToUpdate.id
    itemToUpdate.current_renter = payload.sub
    try {
      await axios.put(`/api/items/${item.id}/currentrenter/`, itemToUpdate, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
      )
    } catch (err) {
      console.log(err)
    }
  }
```

#### Removing from Wishlist & Rentals frontend

The removing from Wishlist and Rentals functionality is in my UserProfile component. </br> 
My handleRemoveFromWishlist function is the same as my addToWishlist function but the request is sent to the /wishlistremove endpoint instead. </br>
</br>
Remove from rentals function:

```javascript
const handleRemoveFromRentals = async event => {
    const itemToUpdate = items.filter(i => {
      return i.id === parseInt(event.target.value)
    })[0]
    delete itemToUpdate.id
    itemToUpdate.current_renter = null
    try {
      await axios.put(`/api/items/${event.target.value}/currentrenter/`, itemToUpdate, {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
      )
    } catch (err) {
      console.log(err)
    }
  }
```

<hr>

### Styling

My time was quite consumed by figuring out the add-to-wishlist and add-to-rentals functionality so my styling was more rushed than I would have liked. Fortunately I had planned the overall styling to be quite minimalistic so I was able to make it look professional without having to experiment too much. </br>
</br>
I used a CSS framework (Semantic UI) in Project 3 and found it complicated to customise. I am quite specific when it comes to visuals and I enjoyed having a lot more control in this project. </br>
</br>
My main stylistic feature was the banner which can be seen at the top of this README. I collaged this together in Adobe Photoshop and I feel it meets the highend/fun/contemporary feel I wanted for the overall site. 
</br>

![banner](https://res.cloudinary.com/project-3/image/upload/v1622590969/sei-readmes/banner_dsgoah.png)

If I had more time I would definitely have wanted to have a few black & white versions of the stars dotted randomly on the main pages in the background.

## <a name="bugs"></a>Bugs
* I am sure the register form did work on the front-end at one point while I was developing the app. However during my presentation of the project it threw an error, which it still has. This error is 'can't read property 'username' of undefined' & I hope to solve this if I continue to develop the project. The register functionality does work on the backend however. 
* Once the user is logged-in they have to refresh the page to access the user profile. This isn't an error or bug as such but does effect the user experience. 
* Similarly, if you remove an item from the rented items or wishlist items, you have to refresh the page for them to dissappear on screen. 

## <a name="challenges"></a>Challenges
* This was my first experience with building a full-stack app independently. So a big challenge was having to rely on my own knowledge and sort through issues myself (with the instructors there if needs be).
* We had only just learned a bit of Python so that was quite difficult to get used to on the backend. 
* I found the add to / remove from wishlist and rentals the most confusing and time-consuming aspect of the project. I found it hard to conceptualise how they worked, and when I tried to look online for guidence I couldn't find many similar processes. I asked for some tips from the tutors and once I had a basic concept of how they worked I felt more confident to get it to do what I wanted. 

## <a name="wins"></a>Wins
* The styling went very smoothly and I got a lot done in a short amount of time. I feel it looks quite professional on the whole. 
* My MVP works well (its a shame about the register form however)
* Feeling confident that I can build a full-stack app from start to finish. As my this was my final project it was exciting to see how far I had come since the start of the course. 
* I was glad that I had detailed notes on setting up a Django app because it is a more long and specific process than what I was used to. 

## <a name="future"></a>Future Improvements
* One key thing that would improve the UX of the app would be visual cues to show when an action has been done. For example, if the user presses the add-to-wishlist button, it changes colour or text pops up saying 'added to wishlist'. Similarly, I tried to add error messages to the register and log-in forms but I couldn't get them to display so a future improvement would be getting them working. 
* Ability for a logged-in user to upload items of clothing to rent. This would be done through a form with a PUT request. 
* Fill out some of the information. Add more items in the database and information on the about page.
* Ability to filter the items by type, size, brand & colour. I didn't want to focus on filter functionality as I spent a lot of time on this in project three and wanted to work on areas I hadn't explored before. Once I add the filter I could link to specific types of items from the homepage, so the 'tops' image would link to the filtered tops in the index etc.

## <a name="learning"></a>Key Learning
* Since I was working on my own I had to do a lot of the searching for answers myself. I did this by reading documentation and going on sites like Stack Overflow. When it came to Django I found reading through documentation useful so I'll do that more in the future. 
* I like the control I had over this project, which is something I'm used to, having studied art, but it definitely helped me to see the benefit of working in a group. It is very helpful to bounce off someone else for ideas when it comes to tricky functionality, something which helped the development process move along more quickly in projects two and three. 

