<?php

class User
{
	public $id;
	public $login;
	public $fullName;
	public $eMail;

	public function __construct(
	$id = 0,
	$login = '',
	$fullName = '',
	$eMail = ''
	)
	{
		$this->id = $id;
		$this->login = $login;
		$this->fullName = $fullName;
		$this->eMail = $eMail;
	}
}