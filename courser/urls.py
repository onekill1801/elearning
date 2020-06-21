from django.urls import path, include
from courser.views import *

urlpatterns = [
    path('home/', HomeView.as_view(), name='home-view'),

#   Phan ung voi giao dien moi
    path('subject/', C_Subject.as_view(), name='c_subject'),
    path('course_c/', C_Course.as_view(), name='c_course'),
    # Chuc nang cua teacher
    path('course_full/<int:c_id>', C_CourseFull.as_view(), name='full_course'),
    path('del_c/<int:c_id>',delete_course, name='del_c_view'),
    path('del_m/<int:m_id>',delete_module, name='del_m_view'),
    path('edit_m/<int:m_id>',edit_module, name='edit_m_view'),
    path('update_m/<int:m_id>',update_module, name='update_m_view'),
    path('question_m/<int:c_id>',QuestionManagement.as_view(), name='question_m_view'),
    path('del_q/<int:q_id>',delete_question , name='del_q_view'),
    path('ajax_q/',ajax_edit_question , name='ajax_edit_quest'),
    path('update/',update_question , name='update_quest'),
    path('mark/',markCouse , name='mark_Couse'),

#	Chuc nang cua student  
    path('l_course/', Guest_Course.as_view(), name='list_course'),
    path('course/<int:c_id>', S_CourseFull.as_view(), name='show_course'),
    path('ajax/', getTest , name='ajax_test'),

    # Phan 3
    path('enroll/<int:c_id>/<int:s_id>', Enrollment.as_view(), name='enroll_view'),
    path('rate/<int:c_id>', RateCourse.as_view(), name='rate_view'),
    path('l_course_s/<int:subject_id>', listCourseSubject , name='list_course_subject'),
    path('l_course_t/<int:tag_id>', listCourseTag, name='list_course_tag'),
    path('search/', search, name='form_search'),

]
