# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  belongs_to :profile, class_name: "Profile", optional: true

  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :validatable

  include DeviseTokenAuth::Concerns::User

  def profile_name
    profile.try(:name)
  end

end