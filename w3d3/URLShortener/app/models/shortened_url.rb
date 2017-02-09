# == Schema Information
#
# Table name: shortened_urls
#
#  id         :integer          not null, primary key
#  long_url   :string           not null
#  short_url  :string           not null
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#


require 'securerandom'

class ShortenedUrl < ActiveRecord::Base
  validates :long_url, :short_url, uniqueness: true, presence: true
  validate :no_spamming
  validate :nonpremium_max

  belongs_to :submitter,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :visits,
    primary_key: :id,
    foreign_key: :shortened_id,
    class_name: :Visit

  has_many(
   :visitors,
    Proc.new { distinct },
    through: :visits,
    source: :visitor
    )

  has_many :taggings,
    primary_key: :id,
    foreign_key: :shortened_id,
    class_name: :Tagging

  has_many :topics,
    through: :taggings,
    source: :topic

  def self.prune(n = 0.5)
    recent_items = Visit.recent(n).pluck(:shortened_id)
    recent_items = [0] if recent_items.empty?
    old_urls = ShortenedUrl.where("id NOT IN (?)", recent_items)
    old_urls.each do |url|
      next if url.submitter.premium
      url.taggings.map { |tagging| tagging.destroy }
      url.visits.map { |visit| visit.destroy }
      url.destroy
    end
  end

  def nonpremium_max
    return true if submitter.premium

    count = ShortenedUrl.where("user_id = ?", user_id).count
    if count > 4
      errors[:max] << "Only premium users are allowed to shorten more than 5 links ever."
    end
  end

  def no_spamming
    count = ShortenedUrl.where("user_id = ? AND created_at > ?", user_id, 1.minutes.ago).count
    if count > 4
      errors[:spamming] << "Only premium users are allowed to shorten more than 5 links in 1 minute"
    end
  end

  def self.random_code
    SecureRandom.urlsafe_base64
  end

  def self.shorten(user, long_url)
    s = ShortenedUrl.random_code
    while ShortenedUrl.exists?(short_url: s)
    s = ShortenedUrl.random_code
    end

    ShortenedUrl.create(user_id: user.id, long_url: long_url, short_url: s)
  end
end
