require 'rails_helper'

RSpec.describe User, type: :model do

  it { is_expected.to belong_to(:profile).optional }

  describe 'database authenticable' do
    it 'is authenticable' do
      user = User.create(
        email: 'test@example.com',
        password: '123password',
        password_confirmation: '123password'
      )
      expect(user.valid_password?('123password')).to be_truthy
    end

    it 'not is authenticable' do
      user = User.create(
        email: 'test2@example.com',
        password: '@@@password',
        password_confirmation: '$$$password'
      )
      expect(user.valid_password?('123password')).to be_falsey
    end
  end

end
