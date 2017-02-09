# == Schema Information
#
# Table name: tag_topics
#
#  id         :integer          not null, primary key
#  tag_topic  :string           not null
#  created_at :datetime
#  updated_at :datetime
#



class TagTopic < ActiveRecord::Base
  validates :tag_topic, presence: true, uniqueness: true

  has_many :taggings,
    primary_key: :id,
    foreign_key: :tag_topic_id,
    class_name: :Tagging

  has_many :urls,
    through: :taggings,
    source: :url

  def popular_links
    list_url = self.urls.sort_by{|url| url.visits.count}.reverse.take(5)
    list_url.map { |url| [url,url.visits.count] }
  end

end
