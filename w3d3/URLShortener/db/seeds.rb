# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Table name: shortened_urls
#
#  id         :integer          not null, primary key
#  long_url   :string           not null
#  short_url  :string           not null
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#
User.destroy_all
user1 = User.create(email: 'a@gmail.com', premium: true)
user2 = User.create(email: 'b@gmail.com')
user3 = User.create(email: 'c@gmail.com')

ShortenedUrl.destroy_all
url1 = ShortenedUrl.shorten(user1, 'apple.com')
url2 = ShortenedUrl.shorten(user3, 'gmail.com')
url3 = ShortenedUrl.shorten(user1, 'music.com')
url4 = ShortenedUrl.shorten(user1, 'piano.com')
url5 = ShortenedUrl.shorten(user1, 'github.com')
url6 = ShortenedUrl.shorten(user2, 'spotify.com')
url7 = ShortenedUrl.shorten(user1, 'pandora.com')
url8 = ShortenedUrl.shorten(user2, 'youtube.com')
url9 = ShortenedUrl.shorten(user3, 'violin.com')
#
Visit.destroy_all
visit1 = Visit.record_visit!(user2, url1)
visit2 = Visit.record_visit!(user2, url1)
visit3 = Visit.record_visit!(user3, url2)
visit3 = Visit.record_visit!(user2, url3)

visit3 = Visit.record_visit!(user1, url4)
visit3 = Visit.record_visit!(user1, url4)
visit3 = Visit.record_visit!(user2, url5)
visit3 = Visit.record_visit!(user2, url5)

visit3 = Visit.record_visit!(user1, url6)
visit3 = Visit.record_visit!(user1, url6)
visit3 = Visit.record_visit!(user2, url7)
visit3 = Visit.record_visit!(user2, url7)

visit3 = Visit.record_visit!(user3, url8)
visit3 = Visit.record_visit!(user3, url8)
visit3 = Visit.record_visit!(user1, url9)
visit3 = Visit.record_visit!(user2, url9)


TagTopic.destroy_all
tag1 = TagTopic.create(tag_topic: 'tech')
tag2 = TagTopic.create(tag_topic: 'music')

#  shortened_id :integer          not null
#  tag_topic_id :integer
Tagging.destroy_all
Tagging.create(shortened_id: url1.id, tag_topic_id: tag1.id)
Tagging.create(shortened_id: url2.id, tag_topic_id: tag1.id)
Tagging.create(shortened_id: url3.id, tag_topic_id: tag2.id)
Tagging.create(shortened_id: url4.id, tag_topic_id: tag2.id)
Tagging.create(shortened_id: url5.id, tag_topic_id: tag1.id)
Tagging.create(shortened_id: url6.id, tag_topic_id: tag2.id)
Tagging.create(shortened_id: url7.id, tag_topic_id: tag2.id)
Tagging.create(shortened_id: url8.id, tag_topic_id: tag2.id)
Tagging.create(shortened_id: url9.id, tag_topic_id: tag2.id)
