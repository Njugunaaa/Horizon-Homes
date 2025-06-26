from app import app
from config import db
from models import User, Property, UserProperty, Review
from datetime import datetime, date

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

    # ADDED: Additional test users
    user4 = User(name='owner2', email='owner2@example.com', role='owner')
    user4.password_hash = 'ownerpass123'

    user5 = User(name='tenant1', email='tenant@example.com', role='user')
    user5.password_hash = 'tenantpass456'

    db.session.add_all([user1, user2, user3, user4, user5])
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
        description='A cozy and modern apartment in the heart of Nairobi with excellent amenities and great connectivity.',
        features="WiFi,Balcony,Furnished,Parking",
        status='available'
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

    # ADDED: Additional properties for more test data
    property4 = Property(
        title='Luxury Villa in Karen',
        location='Karen, Nairobi',
        image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHOXs23GioaluEPCHy-dRQgWlYmKAveLQxkeQYvUN0DEPpPMjCch3ZEcI4c8qt904vbkU&usqp=CAU',
        bedrooms=5,
        size='2500 sqft',
        distance='15 km from CBD',
        price=120000.00,
        type='Villa',
        description='Exclusive luxury villa in the prestigious Karen area with premium amenities and beautiful landscaping.',
        features="Swimming Pool,Garden,Gym,Security System,Maid Quarters",
        status='available'
    )

    property5 = Property(
        title='Affordable Bedsitter in Kasarani',
        location='Kasarani, Nairobi',
        image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwMM3rnn-FQ_LGQVq5QBAVrqNqmycxtSB4rHDArKqoSZazWrU7ima9CSwwfwNZw5qe7GY&usqp=CAU',
        bedrooms=1,
        size='300 sqft',
        distance='12 km from CBD',
        price=15000.00,
        type='Bedsitter',
        description='Budget-friendly accommodation perfect for young professionals and students.',
        features="WiFi,Water,Electricity,Security",
        status='rented'
    )

    property6 = Property(
        title='Family House in Mombasa',
        location='Mombasa, Kenya',
        image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyE2TG9fqxGbH6t8NzC3OcWwGpvgX0b4F_Vb8qXG1yOuNwWqioiV6VuGkm39EKJMRs-hs&usqp=CAU',
        bedrooms=3,
        size='1200 sqft',
        distance='5 km from beach',
        price=45000.00,
        type='House',
        description='Beautiful family house near the beach with tropical ambiance and modern facilities.',
        features="Beach Access,Garden,Parking,Security System",
        status='maintenance'
    )

    db.session.add_all([property1, property2, property3, property4, property5, property6])
    db.session.commit()

    print("Creating user-property relations...")
    up1 = UserProperty(
        user=user1, 
        property=property1, 
        relationship_type='owned',
        notes='Primary rental property'
    )
    up2 = UserProperty(
        user=user1, 
        property=property2, 
        relationship_type='owned',
        notes='Family vacation home'
    )
    up3 = UserProperty(
        user=user1, 
        property=property3, 
        relationship_type='owned',
        notes='Investment property'
    )
    up4 = UserProperty(
        user=user2, 
        property=property1, 
        relationship_type='interested',
        notes='Looking for 2-bedroom apartment'
    )
    up5 = UserProperty(
        user=user3, 
        property=property2, 
        relationship_type='rented',
        start_date=date(2024, 1, 1),
        end_date=date(2024, 12, 31),
        notes='Annual lease agreement'
    )
    
    # ADDED: More relationships
    up6 = UserProperty(
        user=user4, 
        property=property4, 
        relationship_type='owned',
        notes='Luxury property investment'
    )
    up7 = UserProperty(
        user=user2, 
        property=property4, 
        relationship_type='interested',
        notes='Interested in luxury villa'
    )
    up8 = UserProperty(
        user=user5, 
        property=property5, 
        relationship_type='rented',
        start_date=date(2024, 6, 1),
        end_date=date(2025, 5, 31),
        notes='Student accommodation'
    )
    up9 = UserProperty(
        user=user4, 
        property=property5, 
        relationship_type='owned',
        notes='Budget rental property'
    )
    up10 = UserProperty(
        user=user4, 
        property=property6, 
        relationship_type='owned',
        notes='Coastal property investment'
    )
    up11 = UserProperty(
        user=user3, 
        property=property3, 
        relationship_type='viewed',
        notes='Viewed but decided against'
    )

    db.session.add_all([up1, up2, up3, up4, up5, up6, up7, up8, up9, up10, up11])
    db.session.commit()

    print("Adding reviews...")
    review1 = Review(
        comments="Amazing place, very quiet and clean. The landlord is responsive and helpful.",
        ratings=5,
        user_property=up4  
    )

    review2 = Review(
        comments="Spacious and peaceful. Great stay overall. Love the lake view!",
        ratings=4,
        user_property=up5  
    )

    # ADDED: Additional reviews for better test data
    review3 = Review(
        comments="Great location and excellent amenities. Highly recommended for families!",
        ratings=5,
        user_property=up7
    )

    review4 = Review(
        comments="Good value for money, but could use some maintenance on the balcony.",
        ratings=3,
        user_property=up4
    )

    review5 = Review(
        comments="Perfect for students! Affordable and has everything you need.",
        ratings=4,
        user_property=up8
    )

    review6 = Review(
        comments="The studio is modern and well-equipped. Great for remote work.",
        ratings=5,
        user_property=up11
    )

    review7 = Review(
        comments="Luxury at its finest! The villa exceeded all expectations.",
        ratings=5,
        user_property=up7
    )

    review8 = Review(
        comments="Nice property but a bit overpriced for the location.",
        ratings=3,
        user_property=up5
    )

    db.session.add_all([review1, review2, review3, review4, review5, review6, review7, review8])
    db.session.commit()

    print("✅ Seeding complete!")
    print("=" * 50)
    print(f" DATABASE SUMMARY:")
    print(f" Users created: {User.query.count()}")
    print(f" Properties created: {Property.query.count()}")
    print(f" User-Property relationships: {UserProperty.query.count()}")
    print(f"⭐ Reviews created: {Review.query.count()}")
    print("=" * 50)
    
    # ADDED: Display some statistics
    print(" STATISTICS:")
    available_properties = Property.query.filter_by(status='available').count()
    rented_properties = Property.query.filter_by(status='rented').count()
    maintenance_properties = Property.query.filter_by(status='maintenance').count()
    
    print(f"🟢 Available properties: {available_properties}")
    print(f"🔴 Rented properties: {rented_properties}")
    print(f"🟡 Properties under maintenance: {maintenance_properties}")
    
    owners = User.query.filter_by(role='owner').count()
    users = User.query.filter_by(role='user').count()
    
    print(f" Property owners: {owners}")
    print(f" Regular users: {users}")
    print("=" * 50)
