class ApplicationController < ActionController::Base
  include ActionController::RequestForgeryProtection
  #protect_from_forgery with: :exception, if: -> { !request.format.json? && verify_api}
  protect_from_forgery with: :null_session

  def authenticate_current_user
    head :unauthorized if current_user_get.nil?
  end

  def current_user_get
    return nil unless cookies[:auth_headers]
    auth_headers = JSON.parse(cookies[:auth_headers])
    expiration_datetime = DateTime.strptime(auth_headers['expiry'], '%s')
    current_user = User.find_by(uid: auth_headers['uid'])

    if current_user &&
      current_user.tokens.key?(auth_headers['client']) &&
      expiration_datetime > DateTime.now
      @current_user = current_user
    end

    @current_user
  end

  def verify_api
    params[:controller].split('/')[0] != 'devise_token_auth'
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:uid, :provider, :name])
  end
end
