from app import app
from config import db
from models import User, Listing, Feature, Bookmark

# Clear existing data
with app.app_context():
    print("🧹 Clearing existing data...")
    Bookmark.query.delete()
    Feature.query.delete()
    Listing.query.delete()
    User.query.delete()
    db.session.commit()

    print("Creating users...")
    user1 = User(email='owner@example.com', role='owner')
    user1.password_hash = 'password123'

    user2 = User(email='user@example.com', role='user')
    user2.password_hash = 'userpass456'

    user3 = User(email='agent@example.com', role='owner')
    user3.password_hash = 'agentpass789'

    user4 = User(email='viewer@example.com', role='user')
    user4.password_hash = 'viewpass321'

    db.session.add_all([user1, user2, user3, user4])
    db.session.commit()

    print("Creating listings...")
    listing1 = Listing(
        title='Cozy Apartment in Nairobi',
        location='Nairobi, Kenya',
        image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Fcoralpi.com%2Fwp-content%2Fuploads%2F2025%2F01%2FGT-2-525x328.jpg&imgrefurl=https%3A%2F%2Fcoralpi.com%2Fhouses-for-rent-in-nairobi%2F&docid=DjKcCcrGaf8wAM&tbnid=HcXVdFVjpt06DM&vet=12ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECFsQAA..i&w=525&h=328&hcb=2&ved=2ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECFsQAA',
        bedrooms=2,
        size='900 sqft',
        distance='5 km from CBD',
        price=35000.00,
        type='Apartment',
        description='A cozy and modern apartment in the heart of Nairobi.',
        owner=user1
    )

    listing2 = Listing(
        title='Spacious Bungalow in Kisumu',
        location='Kisumu, Kenya',
        image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Fsirfrancismarketingltd.co.ke%2Fwp-content%2Fuploads%2F2023%2F04%2Fimage00005-scaled.jpeg&imgrefurl=https%3A%2F%2Fsirfrancismarketingltd.co.ke%2Fproperties%2Fflats-apartment%2Fnairobi%2Fnorthcote-apartments-for-sale-and-rent-in-kilimani-near-yaya-centre%2F&docid=1R0KZPsf4pLH9M&tbnid=0DlmDiUKpCk2FM&vet=12ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECHIQAA..i&w=2560&h=1440&hcb=2&ved=2ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECHIQAA',
        bedrooms=4,
        size='1500 sqft',
        distance='8 km from city center',
        price=50000.00,
        type='House',
        description='A beautiful and spacious bungalow near Lake Victoria.',
        owner=user1
    )

    listing3 = Listing(
        title='Modern Studio in Westlands',
        location='Westlands, Nairobi',
        image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Fwww.advance-africa.com%2Fimages%2FTo-Let-Lower-Kabete-4.jpg&imgrefurl=https%3A%2F%2Fwww.advance-africa.com%2FNairobi-Houses-for-Rent-in-Nairobi.html&docid=t-qtaHa3gVbsYM&tbnid=ju71tXLQkLmYMM&vet=12ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECGQQAA..i&w=4032&h=3024&hcb=2&ved=2ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECGQQAA',
        bedrooms=1,
        size='400 sqft',
        distance='3 km from CBD',
        price=20000.00,
        type='Studio',
        description='Ideal for students or young professionals.',
        owner=user3
    )

    listing4 = Listing(
        title='Luxurious Villa in Karen',
        location='Karen, Nairobi',
        image_url='https://www.google.com/imgres?q=houses%20and%20apartments%20in%20nairobi&imgurl=https%3A%2F%2Frealtors.co.ke%2Fwp-content%2Fuploads%2F2024%2F10%2Faffordable-estates-to-live-in-Nairobi.webp&imgrefurl=https%3A%2F%2Frealtors.co.ke%2Fcost-of-building-rental-houses-in-kenya%2F&docid=Ovr3Ac6-X8ldjM&tbnid=97n_RTL3QnR5fM&vet=12ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECB4QAA..i&w=900&h=543&hcb=2&ved=2ahUKEwiX4v7L24mOAxX5VfEDHVYkNs4QM3oECB4QAA',
        bedrooms=5,
        size='3000 sqft',
        distance='15 km from CBD',
        price=120000.00,
        type='Villa',
        description='Premium property with private garden and pool.',
        owner=user3
    )

    db.session.add_all([listing1, listing2, listing3, listing4])
    db.session.commit()

    print("Adding features...")
    features = [
        Feature(name='WiFi', listing=listing1),
        Feature(name='Balcony', listing=listing1),
        Feature(name='Garden', listing=listing2),
        Feature(name='Garage', listing=listing2),
        Feature(name='24hr Security', listing=listing3),
        Feature(name='Fully Furnished', listing=listing3),
        Feature(name='Swimming Pool', listing=listing4),
        Feature(name='Private Garden', listing=listing4),
        Feature(name='Backup Generator', listing=listing4),
    ]

    db.session.add_all(features)
    db.session.commit()

    print("Creating bookmarks...")
    bookmarks = [
        Bookmark(user=user2, listing=listing1),
        Bookmark(user=user2, listing=listing2),
        Bookmark(user=user4, listing=listing3),
        Bookmark(user=user4, listing=listing4),
        Bookmark(user=user4, listing=listing1),
    ]

    db.session.add_all(bookmarks)
    db.session.commit()

    print("Seeding complete with multiple users, listings, and bookmarks!")
