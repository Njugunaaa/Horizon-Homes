from app import app
from config import db
from models import User, Listing, Bookmark

with app.app_context():
    print("🧹 Clearing existing data...")
    Bookmark.query.delete()
    Listing.query.delete()
    User.query.delete()
    db.session.commit()

    print("Creating users...")
    user1 = User(email='owner@example.com', role='owner')
    user1.password_hash = 'password123'

    user2 = User(email='user@example.com', role='user')
    user2.password_hash = 'userpass456'

    user3 = User(email='seconduser@example.com', role='user')
    user3.password_hash = 'secondpass789'

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    print("Creating listings with features...")
    listings = [
        Listing(
            title='Cozy Apartment in Nairobi',
            location='Nairobi, Kenya',
            image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Fsirfrancismarketingltd.co.ke%2Fwp-content%2Fuploads%2F2023%2F04%2Fimage00005-scaled.jpeg&imgrefurl=https%3A%2F%2Fsirfrancismarketingltd.co.ke%2Fproperties%2Fflats-apartment%2Fnairobi%2Fnorthcote-apartments-for-sale-and-rent-in-kilimani-near-yaya-centre%2F&docid=1R0KZPsf4pLH9M&tbnid=0DlmDiUKpCk2FM&vet=12ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECG4QAA..i&w=2560&h=1440&hcb=2&ved=2ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECG4QAA',
            bedrooms=2,
            size='900 sqft',
            distance='5 km from CBD',
            price=35000.00,
            type='Apartment',
            description='A cozy and modern apartment in the heart of Nairobi.',
            features="WiFi,Balcony,Furnished",
            owner=user1
        ),
        Listing(
            title='Spacious Bungalow in Kisumu',
            location='Kisumu, Kenya',
            image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Fpropscout.co.ke%2Fstorage%2Fproperties%2Ffiles%2F4-bedroom-maisonette-for-rent-in-syokimau-wlo2o.jpg&imgrefurl=https%3A%2F%2Fpropscout.co.ke%2F4-bedrooms%2Ffor-rent%2Fin%2Fsyokimau-nairobi-kenya&docid=xCzGplrw2lyDJM&tbnid=xhX-qpoAP-ScWM&vet=12ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECDgQAA..i&w=2048&h=1536&hcb=2&ved=2ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECDgQAA',
            bedrooms=4,
            size='1500 sqft',
            distance='8 km from city center',
            price=50000.00,
            type='House',
            description='A beautiful and spacious bungalow near Lake Victoria.',
            features="Garden,Garage,Security System",
            owner=user1
        ),
        Listing(
            title='Modern Studio in Westlands',
            location='Westlands, Nairobi',
            image_url='https://www.google.com/url?sa=i&url=https%3A%2F%2Frealtors.co.ke%2Fcost-of-building-rental-houses-in-kenya%2F&psig=AOvVaw0PUvJLcAgYCwJOVw-L1EmP&ust=1750850363490000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCICj24H4iY4DFQAAAAAdAAAAABAE',
            bedrooms=1,
            size='400 sqft',
            distance='3 km from CBD',
            price=25000.00,
            type='Studio',
            description='Perfect for students and remote workers.',
            features="WiFi,Kitchenette,24hr Security",
            owner=user1
        ),
        Listing(
            title='Luxurious Penthouse in Mombasa',
            location='Mombasa Island',
            image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Fcf.bstatic.com%2Fxdata%2Fimages%2Fhotel%2Fmax1024x768%2F650544976.jpg%3Fk%3D926a2d887b821a0b4709fb41c815d2d01a7b7d907ef9fd796534dd78b0dd10da%26o%3D%26hp%3D1&imgrefurl=https%3A%2F%2Fwww.booking.com%2Fhotel%2Fke%2Fkindaruma-homes-apartments.html&docid=A8EEjhhWNlIoSM&tbnid=vvJ6EWsGilskvM&vet=12ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECFoQAA..i&w=1024&h=768&hcb=2&ved=2ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECFoQAA',
            bedrooms=3,
            size='2000 sqft',
            distance='2 km from beach',
            price=100000.00,
            type='Penthouse',
            description='Enjoy ocean views and rooftop access in this luxurious unit.',
            features="Ocean View,Jacuzzi,Smart Locks,Air Conditioning",
            owner=user1
        ),
        Listing(
            title='Quiet Retreat in Nakuru',
            location='Nakuru Town',
            image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Feru.ecitizen.go.ke%2Fassets%2Fbomayangu%2Fhero-slide-1-b9c6b5e5-scaled.jpg&imgrefurl=https%3A%2F%2Fwww.bomayangu.go.ke%2F&docid=SEHZbKhdv7eHxM&tbnid=UpHDrTGlr8YOXM&vet=12ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECEEQAA..i&w=2560&h=1920&hcb=2&ved=2ahUKEwjZ_a7_94mOAxWxRvEDHaJYAlkQM3oECEEQAA',
            bedrooms=2,
            size='800 sqft',
            distance='6 km from CBD',
            price=28000.00,
            type='Cottage',
            description='Quiet and private space, ideal for long stays.',
            features="Garden,Pet Friendly,Fireplace",
            owner=user1
        )
    ]

    db.session.add_all(listings)
    db.session.commit()

    print("Creating bookmarks...")
    bookmarks = [
        Bookmark(user=user2, listing=listings[0]),
        Bookmark(user=user2, listing=listings[1]),
        Bookmark(user=user3, listing=listings[2]),
        Bookmark(user=user3, listing=listings[3]),
        Bookmark(user=user3, listing=listings[4]),
    ]

    db.session.add_all(bookmarks)
    db.session.commit()

    print("Seeding complete!")
