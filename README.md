# Project Four: Carousel Collective

## Contents
[Overview](#overview)<br/>
[Deployed Project](#project)<br/>
[Technologies Used](#tech)<br/>
[Brief](#brief)<br/>
[Process](#process)<br/>
[Bugs](#bugs)<br/>
[Challenges](#challenges)<br/>
[Wins](#wins)<br/>
[Future Improvements](#future)<br/>
[Key Learning](#learning)<br/>

## <a name="overview"></a>Overview
For the final project on the General Assembly Software Engineering Immersive Course we had to create a full-stack app with Django backend and React.js front-end. We had 9 days and could work individually or in a group.
I chose to work individually and created an app for a prospective clothes rental company. 

## <a name="project"></a>Link to Deployed Project
DeployedLink.com </br>
Login User details: </br>
username: annam </br>
email: annam@email.com </br>
password: Password123!

## <a name="tech"></a>Technologies Used
backend
- Python
- PostgreSQL Database
- Django 
- Django REST Framework
- TablePlus
- PyJWT

front-end
- React.js (Hooks)
- JavaScript
- CSS
- Axios
- React Router DOM

Developer Tools / Other
- TablePlus
- Insomnia
- GitHub
- Yarn
- Adobe Photoshop
- Google Fonts
- Cloudinary


## <a name="brief"></a>Brief
* **Build a full-stack application** by making your own backend and your own front-end.
* **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database.
* **Consume your API with a separate front-end** built with React.
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models.
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut.
* **Have a visually impressive design**.
* **Be deployed online** so it's publicly accessible.

## <a name="process"></a>Process

### Day 1: Planning
I chose to work on my own because I wanted to code all aspects of a functioning full-stack application, including areas I didn't have much experience in, such as authentication. </br>
Since I was working on my own I knew that I should make my MVP as simple as possible whilst still meeting the brief. </br>
I decided to build a fashion rental app, with which the user can browse items of clothing and save them to their own wishlist or choose to rent for 7 days. I have not used such an app before so I did some research online, using the sites and looking at their interface and functionality. I wanted my app to have a similar function but the appearence of a more contemporary designer aparel retail site, such as SSENSE. I used the UI of the fashion sites SSENSE and Shyness Space as inspiration for my wireframe. </br>
In my plan I pseudocoded the relationships and functionality I wanted. Then I wireframed the visuals. </br>
INCLUDE IMAGES

# Demonstration of the app flow (images/ video of app)

## Day 2-4: Backend

### Add to rentals
I wrote the model for my items. This has fields for all the information I want to display about the items. It also has a field for 'current_renter' as a one-to-many relationship.

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
    # colour = ArrayField(ArrayField(models.CharField(max_length=20), blank=True))
    colour = models.CharField(max_length=100, blank=True, null=True)
    material = models.CharField(max_length=100, blank=True, null=True)
    is_available = models.BooleanField(default=True)
    description = models.TextField(max_length=800)
    current_renter = models.ForeignKey("jwt_auth.User", on_delete=models.CASCADE, related_name="items", blank=True, null=True)
```

To enable the user to add an items to their rentals I set up some back end functionality. This is a PUT request that gets the ID of the user from the request, as well as the id of the item, then saves the id on the user model. 

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

### Add to Wishlist
One of my relationships would be between items and a user's wishlist. 

I wrote my model for the user that would be used for log in and registration. I added a wishlist_items field as a many-to-many relationship. 

```python
class User(AbstractUser): 
    email = models.CharField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    # profile_image = models.CharField(max_length=300)
    wishlist_items = models.ManyToManyField("items.Item", related_name="users", blank=True)
  ```

In jwt_auth, views.py I wrote this class that would get the user data and id of the item and add the wishlist item to the user profile. 

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

## Day 6-8: frontend

### Rent Now
I knew from doing the backend that the front end would have to send the user id and item id to the backend. 
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

### Day 9: Styling
- I didn't want to use a CSS framework for the styling as I wanted as much control as I could over the UI and visuals. 
- I wanted the branding to come through in the header so designed a header background collage, that felt luxury but also contemporary. I knew it would be easier to keep my overall design quite minimalistic so I could get away with a more decorative header and font. 
- It was important for the information and images to be clear for the user. 

## <a name="bugs"></a>Bugs
- There is a bug on the register form

## <a name="challenges"></a>Challenges
- This was my first experience with building a full-stack app independently. So a big challenge was having to rely on my own knowledge and sort through issues myself (with the instructors there if needs be)
- The backend relationships were the bit I found the trickiest. I found it hard to conceptualise how they worked, and when I tried to look online for guidence I couldn't find many similar processes. 

## <a name="wins"></a>Wins
- I like the styling in particular the header collage.
- Getting the backend to work with the front-end for the add to wishlist and rental items functionality. 
- Learning a lot of the process involved in creating a full stack app. 

## <a name="future"></a>Future Improvements
- More visual descriptors, ie. when you add an item to the wishlist it is clear in the UI that the item was been added. 
- Errors on the register and login forms. 
- Ability for a loggin-in user to upload items of clothing to rent. This would be in a form with a PUT request. 

## <a name="learning"></a>Key Learning
- Read through documentation thoroughly.
- Improve my problem solving abilities.
