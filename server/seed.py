from app import app
from config import db
from models import User, Property, UserProperty, Review

with app.app_context():
    print("Clearing existing data...")
    Review.query.delete()
    UserProperty.query.delete()
    Property.query.delete()
    User.query.delete()
    db.session.commit()

    print("Creating users...")
    user1 = User(name='owner1', email='owner@example.com', role='owner')
    user1.password_hash = 'password123'

    user2 = User(name='user1', email='user@example.com', role='user')
    user2.password_hash = 'userpass456'

    user3 = User(name='user2', email='seconduser@example.com', role='user')
    user3.password_hash = 'secondpass789'

    db.session.add_all([user1, user2, user3])
    db.session.commit()

    print("Creating properties...")
    property1 = Property(
        title='Cozy Apartment in Nairobi',
        location='Nairobi, Kenya',
        image_url='https://www.google.com/imgres?q=nairobi%20houses&imgurl=https%3A%2F%2Fimages.prop24.com%2Fezmcmphd5reo4a2tjiu6fvye5i%2FCrop600x400&imgrefurl=https%3A%2F%2Fwww.property24.co.ke%2Fhouses-for-sale-in-nairobi-c1890&docid=eKYtF5f6jkdNDM&tbnid=9HfYrjGyrgqyYM&vet=12ahUKEwiskJ_j2IyOAxVzYEEAHSKvAjIQM3oECGoQAA..i&w=600&h=400&hcb=2&ved=2ahUKEwiskJ_j2IyOAxVzYEEAHSKvAjIQM3oECGoQAA',
        bedrooms=2,
        size='900 sqft',
        distance='5 km from CBD',
        price=35000.00,
        type='Apartment',
        description='A cozy and modern apartment in the heart of Nairobi.',
        features="WiFi,Balcony,Furnished"
    )

    property2 = Property(
        title='Spacious Bungalow in Kisumu',
        location='Kisumu, Kenya',
        image_url='https://www.google.com/imgres?q=nairobi%20houses&imgurl=https%3A%2F%2Fmansiondeal.com%2Fpublic%2Fuploads%2F14dhdhvhdjvjdfbhdfbhjfd723.webp&imgrefurl=https%3A%2F%2Fmansiondeal.com%2Fpublic%2Fhomes-for-sale.php%3Fs%3Dkenya&docid=Kjq-HY2441X7yM&tbnid=GQfFwP-G0lfwFM&vet=12ahUKEwiskJ_j2IyOAxVzYEEAHSKvAjIQM3oECE0QAA..i&w=620&h=300&hcb=2&itg=1&ved=2ahUKEwiskJ_j2IyOAxVzYEEAHSKvAjIQM3oECE0QAA',
        bedrooms=4,
        size='1500 sqft',
        distance='8 km from city center',
        price=50000.00,
        type='House',
        description='A beautiful and spacious bungalow near Lake Victoria.',
        features="Garden,Garage,Security System"
    )

    property3 = Property(
        title='Modern Studio in Westlands',
        location='Westlands, Nairobi',
        image_url='https://www.google.com/imgres?q=nairobi%20houses&imgurl=https%3A%2F%2Fsirfrancismarketingltd.co.ke%2Fwp-content%2Fuploads%2F2023%2F04%2FIMG_5493-scaled.jpg&imgrefurl=https%3A%2F%2Fsirfrancismarketingltd.co.ke%2Fproperties%2Fhouses-townhouses-bungalows%2Fnairobi%2Frunda-houses-for-sale-nairobi-westlands-runda-kitisuru%2F&docid=UsHX0vqjSAs2uM&tbnid=MMLDwaz8ynKUjM&vet=12ahUKEwiskJ_j2IyOAxVzYEEAHSKvAjIQM3oECF8QAA..i&w=2560&h=1440&hcb=2&ved=2ahUKEwiskJ_j2IyOAxVzYEEAHSKvAjIQM3oECF8QAA',
        bedrooms=1,
        size='400 sqft',
        distance='3 km from CBD',
        price=25000.00,
        type='Studio',
        description='Perfect for students and remote workers.',
        features="WiFi,Kitchenette,24hr Security"
    )

    db.session.add_all([property1, property2, property3])
    db.session.commit()

    print("Creating user-property relations...")
    up1 = UserProperty(user=user1, property=property1)
    up2 = UserProperty(user=user1, property=property2)
    up3 = UserProperty(user=user1, property=property3)
    up4 = UserProperty(user=user2, property=property1)
    up5 = UserProperty(user=user3, property=property2)

    db.session.add_all([up1, up2, up3, up4, up5])
    db.session.commit()

    print("Adding reviews...")
    review1 = Review(
        comments="Amazing place, very quiet and clean.",
        ratings=5,
        user_property=up4  
    )

    review2 = Review(
        comments="Spacious and peaceful. Great stay overall.",
        ratings=4,
        user_property=up5  
    )

    db.session.add_all([review1, review2])
    db.session.commit()

    print("✅ Seeding complete!")
