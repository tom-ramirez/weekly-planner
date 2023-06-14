CREATE TABLE IF NOT EXISTS public.user
(
    id serial constraint user_pk primary key,
    first_name text not null,
    second_name text,
    last_name text not null,
    email text not null UNIQUE,
    password text not null,
    active boolean default true not null
);

CREATE TABLE IF NOT EXISTS public.planner
(
    id serial constraint planner_pk primary key,
    start_date timestamp,
    end_date timestamp,
    user_id int constraint planner_user_user_id_fk references public.user(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS public.task (
    id serial constraint task_pk primary key,
	title text not null,
    description text not null,
	due timestamp,
    accomplished boolean default false not null,
	is_habit boolean default false not null,
	planner_id int constraint task_planner_planner_id_fk references public.planner(id) ON DELETE CASCADE
);
